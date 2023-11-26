import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogService } from './services/catalog.service';
import { SectionService } from './services/section.service';
import { SectionsController } from './controllers/sections.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/Auth.controller';
import { AuthService } from './services/auth.service';
import { Sequelize } from 'sequelize';
import { IDialect } from './main';

@Module({
  imports: [],
  controllers: [
    AppController,
    CatalogController,
    SectionsController,
    UserController,
    AuthController,
  ],
  providers: [
    AppService,
    CatalogService,
    SectionService,
    UserService,
    AuthService,
  ],
})



export class AppModule {}
