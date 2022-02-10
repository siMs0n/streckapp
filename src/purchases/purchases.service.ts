import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonsService } from 'src/persons/persons.service';
import { ProductsService } from 'src/products/products.service';
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

  async findAll(instance?: string): Promise<Purchase[]> {
    return this.purchaseModel
      .find({ instance })
      .populate('person product')
      .exec();
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
      if (result.n === 0) {
        throw new NotFoundException('Could not find purchase to update.');
      }
      return await this.purchaseModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find purchase to update.');
    }
  }

  async remove(id: string) {
    const result = await this.purchaseModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find purchase.');
    }
    return 'Purchase was deleted';
  }

  async removeAllWithInstance(id: string) {
    await this.purchaseModel.deleteMany({ instance: id }).exec();
  }
}
