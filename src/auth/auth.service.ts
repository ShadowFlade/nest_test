import fs from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser, User } from '../user/models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response } from 'express';

import { log } from 'console';

@Injectable()
export class AuthService {

  async auth({ login, password }) {
    let user : IUser;
    const userDB : User = (await User.findOne({ 
      where: { login },
      attributes : ['id','login','password','role'],
    }))
    if(userDB){
      user = userDB.dataValues;
    }

    if (!user) {
      throw new HttpException('No such user was found', HttpStatus.FORBIDDEN);
    }

    const isLegitPassword = await bcrypt.compare(password, user.password);

    if (!isLegitPassword) {
      throw new HttpException('Forbidden2', HttpStatus.FORBIDDEN);
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
    let user : IUser;
      const userDB = await User.findOne({
      where: {
        refreshToken,
      },
    });
    if(!userDB){
      throw new HttpException('No such user found', HttpStatus.FORBIDDEN);
    }
    user = userDB.dataValues;
    console.log(user,' user');
    const refreshTokenDB = user.refreshToken;

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
