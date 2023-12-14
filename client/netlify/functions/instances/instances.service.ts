import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { instanceModelName } from './instance.model';
import { NotFoundError } from '../../errors';

export const getInstances = async () => {
  await connect();

  const Instance = mongoose.model(instanceModelName);
  const results = await Instance.find({}).exec();
  return results;
};

export const getInstanceById = async (id: string) => {
  await connect();

  try {
    const Instance = mongoose.model(instanceModelName);
    const results = await Instance.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })
      .orFail()
      .exec();
    return results;
  } catch (error) {
    throw new NotFoundError('Could not find instance.');
  }
};
