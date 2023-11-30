import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { CreateCatalogDto } from './dto/create-catalog.dto.js';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model.js';


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
  constructor(
    @InjectModel(Product)
    private readonly CatalogService: CatalogService) {}
  
  
  @Post('/delete/:id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: number) {
    return await this.CatalogService.deleteProduct(id);
  }

  @Post('/update/')
  @UseGuards(AuthGuard)
  async updateProduct(@Body() CreateCatalogDto : CreateCatalogDto) {
    return await this.CatalogService.updateProduct(CreateCatalogDto);
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
