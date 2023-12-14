import mongoose from 'mongoose';
import { instanceModelName } from '../instances/instance.model';
import { personModelName } from '../persons/person.model';
import { productModelName } from '../products/product.model';

export interface IPurchase {
  amount: number;
  unitPrice: number;
  quantity: number;
  product: mongoose.Types.ObjectId;
  person: mongoose.Types.ObjectId;
  instance: mongoose.Types.ObjectId;
}

export const purchaseSchema = new mongoose.Schema<IPurchase>({
  amount: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: productModelName,
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: personModelName,
  },
  instance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: instanceModelName,
    index: true,
  },
});

export const purchaseModelName = 'Purchase';

mongoose.model(purchaseModelName, purchaseSchema);
