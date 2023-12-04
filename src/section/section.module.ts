import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Section } from './models/section.model.js';
import { SectionService } from './section.service.js';
import { SectionsController } from './sections.controller.js';
import { CatalogService } from '../catalog/catalog.service.js';
import { Product } from '../catalog/models/product.model.js';

@Module({
  imports: [SequelizeModule.forFeature([Section,Product])],
  providers: [SectionService, CatalogService],
  controllers: [SectionsController],
})
export class SectionModule {}
