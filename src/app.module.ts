import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller.js';
import { AppService } from './services/app.service.js';
import { CatalogController } from './controllers/catalog.controller.js';
import { CatalogService } from './services/catalog.service.js';
import { SectionService } from './services/section.service.js';
import { SectionsController } from './controllers/sections.controller.js';
import { UserController } from './controllers/user.controller.js';
import { UserService } from './services/user.service.js';
import { AuthController } from './controllers/Auth.controller.js';
import { AuthService } from './services/auth.service.js';

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
