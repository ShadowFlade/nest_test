import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller.js';
import { AppService } from './app/app.service.js';
import { AuthController } from './auth/Auth.controller.js';
import { AuthService } from './auth/auth.service.js';
import { CatalogModule } from './catalog/catalog.module.js';
import { UserModule } from './user/user.module.js';
import { CategoryModule } from './category/category.module.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/models/user.model.js';
import { Product } from './catalog/models/product.model.js';
import { Category } from './category/models/category.model.js';
import { IDialect } from './main.js';
import { ProductsCategories } from './common/junction_tables/ProductsCategories.model.js';
const rootObj = {
  dialect: process.env.DB_DIALECT as IDialect,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_LOGIN,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Product, Category, ProductsCategories],
};
@Module({
  imports: [
    SequelizeModule.forRoot(rootObj) ,
    CatalogModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
