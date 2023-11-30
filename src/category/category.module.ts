import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model.js';
import { SectionService } from './section.service.js';
import { SectionsController } from './sections.controller.js';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  providers: [SectionService],
  controllers: [SectionsController],
})
export class CategoryModule {}