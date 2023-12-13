import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { personModelName } from './person.model';

export const getPersons = async (instance?: string) => {
  await connect();

  const Person = mongoose.model(personModelName);
  const results = await Person.find(instance ? { instance } : {}).exec();
  return results;
};

export const getPersonById = async (id: string, instance?: string) => {
  await connect();

  const Person = mongoose.model(personModelName);
  const results = await Person.findOne(
    instance ? { instance, _id: id } : { _id: new mongoose.Types.ObjectId(id) },
  ).exec();
  return results;
};
