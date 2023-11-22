import { Injectable } from '@nestjs/common';
import { FindOptions, Op, Sequelize } from 'sequelize';
import sequelize from 'sequelize/types/sequelize';
import { IUser, User } from '../models/User';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async auth({ login, password }) {
    const user: IUser = (await User.findOne({ where: { login } })).dataValues;
    console.log(user,' user');
    if (!user) {
      return false;
    }
    try {
      const isTrue = await bcrypt.compare(password, user.password);
      console.log(isTrue,' is ture');
      return isTrue;
    } catch {
      console.log('Something happened');
    }
  }
}
