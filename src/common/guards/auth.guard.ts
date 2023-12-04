import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import fs from 'fs';
import { Request as IRequest } from 'express';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { IUser } from '../../user/models/user.model.js';
import { ApiHeader } from '@nestjs/swagger';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as IRequest;
    console.log(request.headers,' headers');
    return this.validateRequest(request);
  }
  @ApiHeader({
    name:"authorization"
  })
  validateRequest(request: IRequest,@Request() req = '') {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader,' auth header ', token,' token')
    if (!token)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    this.validateSecretToken(request, token);

    return true;

  }

  validateSecretToken(request,token){
    jwt.verify(
      token,
      process.env.ACCESS_SECRET_TOKEN,
      (err: Error, user: IUser) => {
        if (err) throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
        request.user = user;
      },
    );
  }

}
