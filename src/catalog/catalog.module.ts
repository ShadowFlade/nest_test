import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model.js';
import { CatalogService } from './catalog.service.js';
import { CatalogController } from './catalog.controller.js';
import { Category } from '../category/models/category.model.js';

@Module({
  imports: [SequelizeModule.forFeature([Category, Product])],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}