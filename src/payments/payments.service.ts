import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonsService } from 'src/persons/persons.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private personsService: PersonsService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const person = await this.personsService.findOne(createPaymentDto.person);

    const createdPayment = new this.paymentModel(createPaymentDto).save();

    const newBalance = person.balance + createPaymentDto.amount;
    this.personsService.update(person._id, { balance: newBalance });

    return createdPayment;
  }

  async findAll(instance?: string): Promise<Payment[]> {
    return this.paymentModel
      .find(instance ? { instance } : undefined)
      .populate('person')
      .exec();
  }

  async findOne(id: string) {
    try {
      return await this.paymentModel.findById(id).populate('person').exec();
    } catch (error) {
      throw new NotFoundException('Could not find payment.');
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const result = await this.paymentModel
        .updateOne({ _id: id }, updatePaymentDto)
        .exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find payment to update.');
      }
      return await this.paymentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find payment to update.');
    }
  }

  async remove(id: string) {
    const result = await this.paymentModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find payment.');
    }
    return 'Payment was deleted';
  }
}
