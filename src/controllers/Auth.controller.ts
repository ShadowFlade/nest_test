import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  async login(@Body() data, @Res() res: Response) {
    const authData = await this.AuthService.auth({ login: data.login, password: data.password });
	if(!authData){
		throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
	} 

	res.json(authData.accessToken);

  }

//   @Post('/register')
//   register(@Body() data) {
//     return this.AuthService.register(data);
//   }
}
