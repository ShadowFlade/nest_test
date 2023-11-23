import { Controller, Get, Param } from '@nestjs/common';
import { SectionService } from '../services/section.service';
import { CatalogService } from '../services/catalog.service';
import { ParamsTokenFactory } from '@nestjs/core/pipes';

export type IProduct = {
  id: number,
  name: string,
  price: number,
  description: string,
  product_category:string
}

@Controller('section')
export class SectionsController {
  constructor(private readonly SectionService: SectionService, private readonly CatalogService: CatalogService) {}
  
  @Get('parent/:id')
  geSectionWithParent(@Param() params){
    return this.SectionService.getWithParent(params.id);
  }

  @Get('')
  getSections(){
      return this.CatalogService.getAllSections();
  }

}
