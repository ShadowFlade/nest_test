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
import { User } from '../user/models/user.model.js';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { userDto } from '../user/dto/user.dto.js';
import { AuthDto } from './dto/auth.dto.js';
import { createUserDto } from '../../src/user/dto/create-user.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';

export type Login = Pick<User, 'login' | 'password'>;

@Controller('')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    private readonly UserService: UserService,
  ) {}

  @Post('login')
  @ApiResponse({ status: 403 })
  @ApiResponse({ status: 200, description: 'Successful login', type: userDto })
  async login(@Body() data: AuthDto, @Res() res: Response) {
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
  @ApiResponse({ type: userDto, status: 201 })
  @ApiResponse({ status: 422, description: 'COULD NOT CREATE THE ELEMENT' })
  register(@Body() UserDto : createUserDto): Promise<createUserDto | false> {
    return this.UserService.add(UserDto);
  }

  @Post('token')
  async regenAccessToken(@Body() body : RefreshTokenDto, @Res() res: Response) {
    return this.AuthService.regenAccessToken(body, res);
  }
}
