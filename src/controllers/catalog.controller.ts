import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatalogService } from '../services/catalog.service';

export type IProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  product_category: string;
};

@Controller('catalog')
export class CatalogController {
  constructor(private readonly CatalogService: CatalogService) {}

  @Get('/allSections')
  async getAllSections(){
    const data = await this.CatalogService.getAllSections();
    return data; 
  }
  
  @Get('/:sectionCode')
  getSectionProducts(@Param('sectionCode') sectionCode: string) {
    if(!sectionCode){
      return;
    }
    console.log('section code')

    return this.CatalogService.getProducts({
      where: { product_category: sectionCode },
    });
  }

  @Get('')
  async getProducts(): Promise<IProduct[]> {
    const data = await this.CatalogService.getProducts();
    return data; 
  }



  @Post('/add')
  addProduct(@Body() { name, description, price }) {
    this.CatalogService.addProduct({ name, description, price });
  }

}
