import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { paymentModelName } from './payment.model';
import { getPersonById, updatePersonById } from '../persons/persons.service';
import { CreatePaymentDto } from './create-payment.dto';

export const makePayment = async (createPaymentDto: CreatePaymentDto) => {
  await connect();

  const person = await getPersonById(createPaymentDto.person);
  const Payment = mongoose.model(paymentModelName);

  const createdPayment = new Payment(createPaymentDto).save();

  const newBalance = person.balance + createPaymentDto.amount;
  await updatePersonById(person._id, { balance: newBalance });

  return createdPayment;
};
