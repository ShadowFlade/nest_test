import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOptions, Op, Sequelize } from 'sequelize';
import sequelize from 'sequelize/types/sequelize';
import { IUser, User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { log } from 'console';

@Injectable()
export class AuthService {
  async auth({ login, password }) {
    const user: IUser = (await User.findOne({ where: { login } })).dataValues;
    console.log(user, ' user');
    if (!user) {
      console.log('no user');
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
 
      const isLegitPassword = await bcrypt.compare(password, user.password);
      if (!isLegitPassword) {
        return false;
      }
      console.log(process.env,' env');
      const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN);
      console.log(accessToken);
      return { accessToken };

  }
}
