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
import { AuthService } from '../services/auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  async login(@Body() data, @Res() res: Response) {
    const isAuthed = await this.AuthService.auth({ login: data.login, password: data.password });
	if(isAuthed){
		return res.status(200).send('Ok');
	} else {
		throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
	}
  }

//   @Post('/register')
//   register(@Body() data) {
//     return this.AuthService.register(data);
//   }
}
