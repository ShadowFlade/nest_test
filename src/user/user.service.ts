import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/user.model.js';
import bcrypt from 'bcrypt';
import { log } from 'console';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDto } from './dto/create-user.dto.js';
import { userDto } from './dto/user.dto.js';

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

      return this.userModel.create({
        login,
        password: hashedPassword,
        name,
        role,
        cratedAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
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
