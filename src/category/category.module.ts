import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model.js';
import { SectionService } from './section.service.js';
import { SectionsController } from './sections.controller.js';
import { CatalogService } from '../../src/catalog/catalog.service.js';
import { Product } from '../../src/catalog/models/product.model.js';

@Module({
  imports: [SequelizeModule.forFeature([Category,Product])],
  providers: [SectionService, CatalogService],
  controllers: [SectionsController],
})
export class CategoryModule {}
