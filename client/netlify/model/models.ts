import mongoose from 'mongoose';

interface IInstance {
  name: string;
  year: number;
  pin: string;
  swishPhoneNumber: string;
}

const instanceSchema = new mongoose.Schema<IInstance>({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  pin: { type: String },
  swishPhoneNumber: { type: String },
});

const Instance = mongoose.model<IInstance>('Instance', instanceSchema);

interface IProductCategory {
  name: string;
  instance: mongoose.Types.ObjectId;
}

const productCategorySchema = new mongoose.Schema<IProductCategory>({
  name: { type: String, required: true },
  instance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Instance.name,
    index: true,
  },
});

const ProductCategory = mongoose.model<IProductCategory>(
  'ProductCategory',
  productCategorySchema,
);

interface IProduct {
  name: string;
  price: number;
  available: boolean;
  category: mongoose.Types.ObjectId;
  instance: mongoose.Types.ObjectId;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductCategory.name,
  },
  instance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Instance.name,
    index: true,
  },
});

export const Product = mongoose.model<IProduct>('Product', productSchema);
