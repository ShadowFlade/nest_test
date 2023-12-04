import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { CreateCatalogDto } from './dto/create-catalog.dto.js';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model.js';
import { updateCatalogDto } from './dto/update-catalog.dto.js';
import { Response } from 'express';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

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
    private readonly CatalogService: CatalogService,
  ) {}

  @Post('/delete/:id')
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product was not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })

  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: number, res: Response) {
    const deleteResult = await this.CatalogService.deleteProduct(id);
    if (deleteResult) {
      res.status(204).json();
    }
    throw new HttpException('PRODUCT NOT FOUND', HttpStatus.NOT_FOUND);
  }

  @Post('/update/')
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product was not found.' })
  @UseGuards(AuthGuard)
  async updateProduct(
    @Body() UpdateCatalogDto: updateCatalogDto,
    res: Response,
  ) {
    const updateResult =
      await this.CatalogService.updateProduct(UpdateCatalogDto);
    if (!updateResult) {
      throw new HttpException('PRODUCT NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return res.status(204).json();
  }

  @Get('/allSections')
  @ApiCreatedResponse({
    type: [CreateCatalogDto],
  })
  async getAllSections() : Promise<CreateCatalogDto[]> {
    const data = await this.CatalogService.getAllSections();
    return data;
  }

  @Post('/add')
  @ApiCreatedResponse({
    description: 'The product was successfully created',
    type: CreateCatalogDto,
  })
  @UseGuards(AuthGuard)
  async addProduct(@Body() { name, description, price }: CreateCatalogDto) {
    return await this.CatalogService.addProduct({ name, description, price });
  }

  @Get('/:sectionCode')
  @ApiCreatedResponse({
    description: 'The products were successfully fetched',
    type: [CreateCatalogDto],
  })
  getSectionProducts(@Param('sectionCode') sectionCode: string) : Promise<Product[]> {
    if (!sectionCode) {
      return;
    }
    return this.CatalogService.getProducts({ productCategory: sectionCode });
  }


  @Get('')
  @ApiCreatedResponse({
    description: 'The products were successfully fetched',
    type: [CreateCatalogDto],
  }) 
  async getProducts() : Promise<CreateCatalogDto[]> {
    const data = await this.CatalogService.getProducts();
    return data;
  }
}
