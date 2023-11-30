import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller.js';
import { AppService } from './app/app.service.js';
import { AuthController } from './auth/Auth.controller.js';
import { AuthService } from './auth/auth.service.js';
import { CatalogModule } from './catalog/catalog.module.js';
import { UserModule } from './user/user.module.js';
import { CategoryModule } from './category/category.module.js';
import { Sequelize } from 'sequelize-typescript';
@Module({
  imports: [CatalogModule, CategoryModule, UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}

