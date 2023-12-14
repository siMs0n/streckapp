import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { personModelName, IPerson } from './person.model';
import { UpdatePersonDto } from './update-person.dto';
import { NotFoundError } from '../../errors';

export const getPersons = async (instance?: string) => {
  await connect();

  const Person = mongoose.model(personModelName);
  const results = await Person.find(instance ? { instance } : {}).exec();
  return results;
};

export const getPersonById = async (id: string, instance?: string) => {
  await connect();

  const Person = mongoose.model<IPerson>(personModelName);
  try {
    const results = await Person.findOne(
      instance
        ? { instance, _id: id }
        : { _id: new mongoose.Types.ObjectId(id) },
    )
      .orFail()
      .exec();
    return results;
  } catch (error) {
    throw new NotFoundError('Could not find person.');
  }
};

export const updatePersonById = async (
  id: string,
  updatePersonDto: Partial<UpdatePersonDto>,
) => {
  const Person = mongoose.model(personModelName);
  const result = await Person.updateOne({ _id: id }, updatePersonDto).exec();
  if (result.modifiedCount === 0) {
    throw new NotFoundError('Could not find person to update.');
  }
  return await Person.findById(id).exec();
};
