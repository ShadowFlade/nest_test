import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model.js';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { AuthService } from '../../src/auth/auth.service.js';
import { AuthController } from '../../src/auth/Auth.controller.js';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, AuthService],
  controllers: [UserController, AuthController],
})
export class UserModule {}
