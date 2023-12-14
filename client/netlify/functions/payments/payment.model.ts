import mongoose from 'mongoose';
import { instanceModelName } from '../instances/instance.model';
import { personModelName } from '../persons/person.model';

export interface IPayment {
  amount: number;
  reference: string;
  person: mongoose.Types.ObjectId;
  instance: mongoose.Types.ObjectId;
}

export const paymentSchema = new mongoose.Schema<IPayment>({
  amount: { type: Number, required: true },
  reference: { type: String, required: true },
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

export const paymentModelName = 'Payment';

mongoose.model(paymentModelName, paymentSchema);
