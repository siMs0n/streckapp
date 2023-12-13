import mongoose from 'mongoose';
import { productCategoryModelName } from '../product-categories/product-category.model';
import { instanceModelName } from '../instances/instance.model';

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

mongoose.model(productModelName, productSchema);
