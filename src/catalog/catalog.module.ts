import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model.js';
import { CatalogService } from './catalog.service.js';
import { CatalogController } from './catalog.controller.js';
import { Section } from '../section/models/section.model.js';
import { SectionService } from '../../src/section/section.service.js';
import { SectionsController } from '../../src/section/sections.controller.js';

@Module({
  imports: [SequelizeModule.forFeature([Section, Product])],
  providers: [CatalogService, SectionService],
  controllers: [CatalogController, SectionsController ],
})
export class CatalogModule {}
