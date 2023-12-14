import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { IPurchase, purchaseModelName } from './purchase.model';
import { getPersonById, updatePersonById } from '../persons/persons.service';
import { CreatePurchaseDto } from './create-purchase';
import { getProductById } from '../products/products.service';

export const makePurchase = async (createPurchaseDto: CreatePurchaseDto) => {
  await connect();

  const person = await getPersonById(createPurchaseDto.person);
  const product = await getProductById(createPurchaseDto.product);
  const Purchase = mongoose.model<IPurchase>(purchaseModelName);

  const createPopulatedPurchaseDto = {
    ...createPurchaseDto,
    unitPrice: product.price,
    amount: product.price * createPurchaseDto.quantity,
  };
  const createdPurchase = new Purchase(createPopulatedPurchaseDto).save();

  const newBalance = person.balance - createPopulatedPurchaseDto.amount;
  await updatePersonById(createPurchaseDto.person, { balance: newBalance });

  return createdPurchase;
};
