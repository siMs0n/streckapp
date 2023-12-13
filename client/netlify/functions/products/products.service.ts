import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { productModelName } from './product.model';

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

  const Product = mongoose.model(productModelName);
  const results = await Product.findOne(
    instance ? { instance, _id: id } : { _id: new mongoose.Types.ObjectId(id) },
  )
    .populate('category')
    .exec();
  return results;
};
