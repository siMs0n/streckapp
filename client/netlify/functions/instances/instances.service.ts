import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { instanceModelName } from './instance.model';

export const getInstances = async () => {
  await connect();

  const Instance = mongoose.model(instanceModelName);
  const results = await Instance.find({}).exec();
  return results;
};

export const getInstanceById = async (id: string) => {
  await connect();

  const Instance = mongoose.model(instanceModelName);
  const results = await Instance.findOne({
    _id: new mongoose.Types.ObjectId(id),
  }).exec();
  return results;
};
