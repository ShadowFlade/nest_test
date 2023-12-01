import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model.js';
import { CatalogService } from './catalog.service.js';
import { CatalogController } from './catalog.controller.js';
import { Category } from '../category/models/category.model.js';
import { SectionService } from '../../src/category/section.service.js';
import { SectionsController } from '../../src/category/sections.controller.js';

@Module({
  imports: [SequelizeModule.forFeature([Category, Product])],
  providers: [CatalogService, SectionService],
  controllers: [CatalogController, SectionsController ],
})
export class CatalogModule {}
