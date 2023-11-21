import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogService } from './services/catalog.service';
import { SectionService } from './services/section.service';
import { SectionsController } from './controllers/sections.controller';

@Module({
  imports: [],
  controllers: [AppController, CatalogController, SectionsController],
  providers: [AppService, CatalogService, SectionService],
})
export class AppModule {}
