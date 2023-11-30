import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service.js';
import { UserService } from '../user/user.service.js';
import { IUser, User } from '../user/models/user.model.js';

@Controller('')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    private readonly UserService: UserService,
  ) {}

  @Post('login')
  async login(@Body() data, @Res() res: Response) {
    const authData = await this.AuthService.auth({
      login: data.login,
      password: data.password,
    });
    if (!authData) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    res.json(authData);
  }

  @Post('/register')
  register(@Body() data) {
    return this.UserService.add(data);
  }

  @Post('token')
  async regenAccessToken(@Body() body, @Req() req, @Res() res: Response) {
    return this.AuthService.regenAccessToken(body, res);
  }
}
