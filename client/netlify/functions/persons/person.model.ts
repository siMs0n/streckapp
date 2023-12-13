import mongoose from 'mongoose';
import { instanceModelName } from '../instances/instance.model';

export interface IPerson {
  name: string;
  balance: number;
  instance: mongoose.Types.ObjectId;
}

export const personSchema = new mongoose.Schema<IPerson>({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  instance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: instanceModelName,
    index: true,
  },
});

export const personModelName = 'Person';

mongoose.model(personModelName, personSchema);
