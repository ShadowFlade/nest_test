import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CatalogService } from '../services/catalog.service.js';
import { AuthGuard } from '../guards/auth.guard.js';

export type IProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  product_category: string;
  createdAt: string;
  updatedAt: string;
};

@Controller('catalog')
export class CatalogController {
  constructor(private readonly CatalogService: CatalogService) {}
  
  
  @Post('/delete/:id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: number) {
    return await this.CatalogService.deleteProduct(id);
  }

  @Post('/update/:id')
  @UseGuards(AuthGuard)
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

    return this.CatalogService.getProducts({
      where: { product_category: sectionCode },
    });
  }


  @Post('/add')
  @UseGuards(AuthGuard)
  async addProduct(@Body() { name, description, price }) {
    
    return await this.CatalogService.addProduct({ name, description, price });
  }

  @Get('')
  async getProducts() {
    const data = await this.CatalogService.getProducts();
    return data; 
  }

}
