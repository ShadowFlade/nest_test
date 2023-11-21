import { Controller, Get } from '@nestjs/common';
import { SectionService } from '../services/section.service';

export type IProduct = {
  id: number,
  name: string,
  price: number,
  description: string,
  product_category:string
}

@Controller('catalog')
export class SectionsController {
  constructor(private readonly CatalogService: SectionService) {}

  @Get('')
  getSections(limit = 10){
    return this.CatalogService.getSections(limit);
  }
}
