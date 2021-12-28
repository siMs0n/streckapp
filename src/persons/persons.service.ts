import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonDto } from './dto/create-person.dto';
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
    return this.personModel.find(instance ? { instance } : undefined).exec();
  }

  async findOne(id: string) {
    try {
      return await this.personModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find person.');
    }
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    try {
      const result = await this.personModel
        .updateOne({ _id: id }, updatePersonDto)
        .exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find person to update.');
      }
      return await this.personModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find person to update.');
    }
  }

  async remove(id: string) {
    const result = await this.personModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find person.');
    }
    return 'Person was deleted';
  }
}
