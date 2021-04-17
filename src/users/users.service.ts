import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async create(credentials: RegisterDTO): Promise<UserDocument> {
    const userExists = await this.findOne(credentials.username);
    if (userExists) {
      throw new ConflictException('Username has already been taken');
    }
    credentials.password = await bcrypt.hash(credentials.password, 10);
    const newUser = new this.userModel(credentials);
    const createdUser = await newUser.save();
    return createdUser;
  }
}
