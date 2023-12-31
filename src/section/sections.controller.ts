import { Controller, Get, Param } from '@nestjs/common';
import { SectionService } from './section.service.js';
import { CatalogService } from '../catalog/catalog.service.js';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { categoryDto } from './dto/sectionDto.dto.js';

export type IProduct = {
  id: number,
  name: string,
  price: number,
  description: string,
  product_category:string
}

@Controller('sections')
export class SectionsController {
  constructor(private readonly SectionService: SectionService, private readonly CatalogService: CatalogService) {}
  

  @Get('children/:id')
  @ApiCreatedResponse({
    type: categoryDto,
  })
  getSectionWithChildren(@Param('id') id: number){
    return this.SectionService.getWithChildren(id);
  }

  @Get('')
  @ApiCreatedResponse({
    type: [categoryDto],
  })
  getSections(){
      return this.CatalogService.getAllSections();
  }

}
