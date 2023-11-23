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

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const isLegitPassword = await bcrypt.compare(password, user.password);

    if (!isLegitPassword) {
      return false;
    }

    const accessToken = this.generateAccessToken(user);

    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN);
    User.update({ refreshToken }, { where: { login } });
    return { accessToken, refreshToken };
  }

  generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: '10s',
    });
  }

  async regenAccessToken(body, req, res){
    const refreshToken = body.token;
    if (!refreshToken)
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    const { dataValues } = await User.findOne({
      where: {
        login: req.user.login,
      },
    });
    const refreshTokenDB = dataValues.refreshToken;
    if (refreshToken == refreshTokenDB)
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);

    return jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_TOKEN,
      (err, user: IUser) => {
        if (err) throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
        const accessToken = this.generateAccessToken({
          login: user.login,
        });
        return accessToken;
      },
    );
  }


}
