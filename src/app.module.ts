import { Module } from '@nestjs/common';

import { AuthController } from './auth/Auth.controller.js';
import { AuthService } from './auth/auth.service.js';
import { CatalogModule } from './catalog/catalog.module.js';
import { UserModule } from './user/user.module.js';
import { SectionModule } from './section/section.module.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/models/user.model.js';
import { Product } from './catalog/models/product.model.js';
import { Section } from './section/models/section.model.js';
import { IDialect } from './main.js';
import { ProductsSections } from './common/junction_tables/ProductsSections.model.js';
import { SectionsSections } from './common/junction_tables/SectionsSections.js';
const rootObj = {
  dialect: process.env.DB_DIALECT as IDialect,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_LOGIN,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Product, Section, ProductsSections, SectionsSections],
};
@Module({
  imports: [
    SequelizeModule.forRoot(rootObj) ,
    CatalogModule,
    SectionModule,
    UserModule,
  ]
})
export class AppModule {}
