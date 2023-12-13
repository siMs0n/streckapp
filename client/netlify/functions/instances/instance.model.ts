import mongoose from 'mongoose';

export interface IInstance {
  name: string;
  year: number;
  pin: string;
  swishPhoneNumber: string;
}

export const instanceSchema = new mongoose.Schema<IInstance>({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  pin: { type: String },
  swishPhoneNumber: { type: String },
});

export const instanceModelName = 'Instance';

mongoose.model(instanceModelName, instanceSchema);
