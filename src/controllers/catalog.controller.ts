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
  
  
  @Post('/delete/:id')
  async deleteProduct(@Param('id') id: number) {
    return await this.CatalogService.deleteProduct(id);
  }

  @Post('/update/:id')
  async updateProduct(@Param('id') id: number, @Body() data) {
    return await this.CatalogService.updateProduct(data);
  }

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





  @Post('/add')
  addProduct(@Body() { name, description, price }) {
    this.CatalogService.addProduct({ name, description, price });
  }

  @Get('')
  async getProducts(): Promise<IProduct[]> {
    const data = await this.CatalogService.getProducts();
    return data; 
  }

}
