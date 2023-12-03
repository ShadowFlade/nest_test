import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { IUser } from '../../user/models/user.model.js';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    return this.validateRequest(request);
  }

  validateRequest(request: Request) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    this.validateSecretToken(request, token);
    this.validateRefreshToken(request);

    

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

  validateRefreshToken(request){

  }
}
