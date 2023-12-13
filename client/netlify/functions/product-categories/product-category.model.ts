import mongoose from 'mongoose';
import { instanceModelName } from '../instances/instance.model';

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

mongoose.model(productCategoryModelName, productCategorySchema);
