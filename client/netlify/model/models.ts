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

export interface IProductCategory {
  name: string;
  instance: mongoose.Types.ObjectId;
}

export const productCategorySchema = new mongoose.Schema<IProductCategory>({
  name: { type: String, required: true },
  instance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: instanceModelName,
    index: true,
  },
});

export const productCategoryModelName = 'ProductCategory';

export interface IProduct {
  name: string;
  price: number;
  available: boolean;
  category: mongoose.Types.ObjectId;
  instance: mongoose.Types.ObjectId;
}

export const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: productCategoryModelName,
  },
  instance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: instanceModelName,
    index: true,
  },
});

export const productModelName = 'Product';
