import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { IProduct, productModelName } from './product.model';
import { NotFoundError } from '../../errors';

export const getProducts = async (instance?: string) => {
  await connect();

  const Product = mongoose.model(productModelName);
  const results = await Product.find(instance ? { instance } : {})
    .populate('category')
    .exec();
  return results;
};

export const getProductById = async (id: string, instance?: string) => {
  await connect();

  try {
    const Product = mongoose.model<IProduct>(productModelName);
    const results = await Product.findOne(
      instance
        ? { instance, _id: id }
        : { _id: new mongoose.Types.ObjectId(id) },
    )
      .populate('category')
      .orFail()
      .exec();
    return results;
  } catch (error) {
    throw new NotFoundError('Could not find product.');
  }
};
