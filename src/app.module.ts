import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller.js';
import { AppService } from './app/app.service.js';
import { CatalogController } from './catalog/catalog.controller.js';
import { CatalogService } from './catalog/catalog.service.js';
import { SectionService } from './category/section.service.js';
import { SectionsController } from './category/sections.controller.js';
import { UserController } from './user/user.controller.js';
import { UserService } from './user/user.service.js';
import { AuthController } from './auth/Auth.controller.js';
import { AuthService } from './auth/auth.service.js';

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
