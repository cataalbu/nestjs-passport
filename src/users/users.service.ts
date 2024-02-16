import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getOne(id: string) {
    return this.userModel.findById(id);
  }

  getOneByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async create(userData: CreateUserDto) {
    const password = hashPassword(userData.password);
    const user = new this.userModel({ ...userData, password });
    return user.save();
  }
}
