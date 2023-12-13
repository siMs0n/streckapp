import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { instanceModelName } from './instance.model';

export const getInstances = async (instance?: string) => {
  await connect();

  const Product = mongoose.model(instanceModelName);
  const results = await Product.find(instance ? { instance } : {})
    .populate('category')
    .exec();
  return results;
};

export const getInstanceById = async (id: string, instance?: string) => {
  await connect();

  const Product = mongoose.model(instanceModelName);
  const results = await Product.findOne(
    instance ? { instance, _id: id } : { _id: new mongoose.Types.ObjectId(id) },
  )
    .populate('category')
    .exec();
  return results;
};
