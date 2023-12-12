import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdateManyDto } from './dto/update-many-dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, PersonDocument } from './schemas/person.schema';

@Injectable()
export class PersonsService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const createdPerson = new this.personModel(createPersonDto);
    return createdPerson.save();
  }

  async findAll(instance?: string): Promise<Person[]> {
    return await this.personModel
      .find(instance ? { instance } : undefined)
      .exec();
  }

  async findOne(id: string) {
    try {
      return await this.personModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find person.');
    }
  }

  async findMany(ids: string[]): Promise<PersonDocument[]> {
    return await this.personModel.find({ _id: { $in: ids } }).exec();
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    try {
      const result = await this.personModel
        .updateOne({ _id: id }, updatePersonDto)
        .exec();
      if (result.modifiedCount === 0) {
        throw new NotFoundException('Could not find person to update.');
      }
      return await this.personModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find person to update.');
    }
  }

  async updateMany(updateManyPersonsDto: UpdateManyDto[]) {
    try {
      const bulkArr = updateManyPersonsDto.map((update) => ({
        updateOne: {
          filter: { _id: new Types.ObjectId(update._id) },
          update: { $set: { balance: update.balance } },
        },
      }));
      return await this.personModel.bulkWrite(bulkArr);
    } catch (error) {
      throw new NotFoundException('Update many failed');
    }
  }

  async remove(id: string) {
    const result = await this.personModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find person.');
    }
    return 'Person was deleted';
  }

  async removeAllWithInstance(id: string) {
    await this.personModel.deleteMany({ instance: id }).exec();
  }
}
