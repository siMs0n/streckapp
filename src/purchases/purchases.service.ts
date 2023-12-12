import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonsService } from 'src/persons/persons.service';
import { ProductsService } from 'src/products/products.service';
import { CreateMultiPurchaseDto } from './dto/create-multi-purchase.dto';
import {
  CreatePopulatedPurchaseDto,
  CreatePurchaseDto,
} from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase, PurchaseDocument } from './schemas/purchase.schema';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<PurchaseDocument>,
    private personsService: PersonsService,
    private productsService: ProductsService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const person = await this.personsService.findOne(createPurchaseDto.person);
    const product = await this.productsService.findOne(
      createPurchaseDto.product,
    );

    const createPopulatedPurchaseDto: CreatePopulatedPurchaseDto = {
      ...createPurchaseDto,
      unitPrice: product.price,
      amount: product.price * createPurchaseDto.quantity,
    };

    const createdPurchase = new this.purchaseModel(
      createPopulatedPurchaseDto,
    ).save();

    const newBalance = person.balance - createPopulatedPurchaseDto.amount;
    this.personsService.update(person._id, { balance: newBalance });

    return createdPurchase;
  }

  async createMany(
    createMultiPurchaseDto: CreateMultiPurchaseDto,
  ): Promise<Purchase[]> {
    const persons = await this.personsService.findMany(
      createMultiPurchaseDto.persons,
    );
    const product = await this.productsService.findOne(
      createMultiPurchaseDto.product,
    );

    const amount = product.price * createMultiPurchaseDto.quantity;

    const purchases = persons.map((person) => {
      const createPopulatedPurchaseDto: CreatePopulatedPurchaseDto = {
        ...createMultiPurchaseDto,
        unitPrice: product.price,
        amount: amount,
        person: person._id,
      };

      return new this.purchaseModel(createPopulatedPurchaseDto);
    });

    await this.purchaseModel.insertMany(purchases);

    const updateManyPersonDtos = persons.map((person) => {
      const newBalance = person.balance - amount;

      return { _id: person._id, balance: newBalance };
    });
    this.personsService.updateMany(updateManyPersonDtos);

    return purchases;
  }

  async findAll(
    instance?: string,
    limit = 100,
    page = 1,
  ): Promise<{ total: number; purchases: Purchase[] }> {
    const purchases = await this.purchaseModel
      .find({ instance })
      .sort({ createdAt: 'desc' })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('person product')
      .exec();

    const total = await this.purchaseModel.estimatedDocumentCount({
      arrayFilters: [{ instance }],
    });
    return { total, purchases };
  }

  async findOne(id: string) {
    try {
      return await this.purchaseModel
        .findById(id)
        .populate('person product')
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find purchase.');
    }
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    try {
      const result = await this.purchaseModel
        .updateOne({ _id: id }, updatePurchaseDto)
        .exec();
      if (result.modifiedCount === 0) {
        throw new NotFoundException('Could not find purchase to update.');
      }
      return await this.purchaseModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find purchase to update.');
    }
  }

  async remove(id: string) {
    const result = await this.purchaseModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find purchase.');
    }
    return 'Purchase was deleted';
  }

  async removeAllWithInstance(id: string) {
    await this.purchaseModel.deleteMany({ instance: id }).exec();
  }
}
