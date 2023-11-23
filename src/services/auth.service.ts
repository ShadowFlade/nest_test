import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOptions, Op, Sequelize } from 'sequelize';
import sequelize from 'sequelize/types/sequelize';
import { IUser, User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response } from 'express';

import { log } from 'console';

@Injectable()
export class AuthService {

  async auth({ login, password }) {
    const user: IUser = (await User.findOne({ 
      where: { login },
      attributes : ['id','login','password','role'],
    },
      
      )).dataValues;

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const isLegitPassword = await bcrypt.compare(password, user.password);

    if (!isLegitPassword) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const accessToken = this.generateAccessToken(user);

    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN);
    await User.update({ refreshToken }, { where: { login } });
    return { accessToken, refreshToken };
  }

  generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: '1m',
    });
  }

  async regenAccessToken(body, res : Response){
    const refreshToken = body.token;
    if (!refreshToken)
      throw new HttpException('FORBIDDEN1', HttpStatus.FORBIDDEN);
    const { dataValues } = await User.findOne({
      where: {
        refreshToken,
      },
    });
    const refreshTokenDB = dataValues.refreshToken;

    if(!refreshTokenDB) throw new HttpException('FORBIDDEN2', HttpStatus.FORBIDDEN);

    return jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_TOKEN,
      (err, user: IUser) => {
        if (err) throw new HttpException('FORBIDDEN4', HttpStatus.FORBIDDEN);
        const accessToken = this.generateAccessToken({
          login: user.login,
        });
        res.json({accessToken});
      },
    );
  }


}
