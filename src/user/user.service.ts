import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/user.model.js';
import bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  delete(login) {
    return this.userModel.destroy({
      where: { login },
    });
  }

  async add({ login, password, name, role = 'user' }) : Promise<createUserDto | false>{
    //but somehow if role is not specified it sets 'user' role anyway
    if (!login || !password) {
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 3);
      const updatedAt = new Date().toUTCString();
      const createdAt = updatedAt;
      return this.userModel.create({
        login,
        password: hashedPassword,
        name,
        role,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });
    } catch {
      throw new HttpException('COULD NOT CREATE THE ELEMENT',HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  get({ login }) {
    if (!login) {
      return;
    }
    return this.userModel.findOne({ where: { login } });
  }
}
