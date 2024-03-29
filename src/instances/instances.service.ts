import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentsService } from 'src/payments/payments.service';
import { PersonsService } from 'src/persons/persons.service';
import { ProductsService } from 'src/products/products.service';
import { PurchasesService } from 'src/purchases/purchases.service';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { Instance, InstanceDocument } from './schemas/instance.schema';

@Injectable()
export class InstancesService {
  constructor(
    @InjectModel(Instance.name) private instanceModel: Model<InstanceDocument>,
    private personsService: PersonsService,
    private paymentsService: PaymentsService,
    private productsService: ProductsService,
    private purchasesService: PurchasesService,
  ) {}

  async create(createInstanceDto: CreateInstanceDto): Promise<Instance> {
    const createdInstance = new this.instanceModel(createInstanceDto);
    return createdInstance.save();
  }

  async findAll(): Promise<Instance[]> {
    return this.instanceModel.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.instanceModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find instance.');
    }
  }

  async update(id: string, updateInstanceDto: UpdateInstanceDto) {
    try {
      const result = await this.instanceModel
        .updateOne(
          { _id: id },
          { ...updateInstanceDto, pin: updateInstanceDto.pin },
        )
        .exec();
      if (result.modifiedCount === 0) {
        throw new NotFoundException('Could not find instance to update.');
      }
      return await this.instanceModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find instance to update.');
    }
  }

  async remove(id: string) {
    //TODO: Cascade deletion
    await this.paymentsService.removeAllWithInstance(id);
    await this.personsService.removeAllWithInstance(id);
    await this.productsService.removeAllWithInstance(id);
    await this.purchasesService.removeAllWithInstance(id);
    const result = await this.instanceModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find instance.');
    }
    return 'Instance was deleted';
  }
}
