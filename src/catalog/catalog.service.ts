import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './models/product.model.js';
import { Op } from 'sequelize';
import { Section } from '../section/models/section.model.js';
import { Helper } from '../common/utils/Helper.js';
import { InjectModel } from '@nestjs/sequelize';
import { updateCatalogDto } from './dto/update-catalog.dto.js';
import { ProductsSections } from '../common/junction_tables/ProductsSections.model.js';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    @InjectModel(Section)
    private readonly sectionModel: typeof Section,
  ) {}
  async getProducts(filter?: { [key: string]: string }) {

    if (filter && filter.productCategory) {
      const section = await Section.findOne({where:{
        slug:filter.productCategory
      }})
      if(!section){
        return;
      }
      const sectionID = section.dataValues.id;
      return await Product.findAll({
        include: {
          model: Section,
          where: {id:sectionID}
        }
      });
    }

    return await Product.findAll();
    
 
  }

  async getProductsBySection(sections) {
    return await ProductsSections.findAll({
      where: {
        sectionID: sections,
      },
    });
  }

  async getAllSections() {
    let sections = await this.sectionModel.findAll({
      limit: 10,
      order: [['slug', 'asc']],
    });

    let sectionsMain = [];
    for (let i = 0; i < sections.length; i++) {
      const id = sections[i].dataValues['id'];
      sectionsMain[id] = sections[i].dataValues;
    }

    const subcategories = [];
    sectionsMain.forEach((_, index) => {
      if (!sectionsMain[index].subcategories) {
        return;
      }
      const id = sectionsMain[index]['id'];

      if (subcategories[id]) {
        subcategories[id].push(...sectionsMain[index].subcategories);
      } else {
        subcategories[id] = [];
        subcategories[id].push(...sectionsMain[index].subcategories);
      }
    });
    let subSections = await this.sectionModel.findAll({
      order: [['slug', 'asc']],
    });
    const subSectionsMain = [];
    subSections.forEach((item) => (subSectionsMain[item.dataValues.id] = item));
    sectionsMain = Helper.formatCategories(sectionsMain, subSectionsMain);

    return sectionsMain.filter((item) => !!item);
  }
  deleteProduct(id) {
    if (!id) {
      return;
    }
    return this.productModel.destroy({
      where: { id },
    });
  }

  async addProduct({ name, description, price }) {
    if (!name) {
      throw new HttpException('No product name', HttpStatus.BAD_REQUEST);
    }
    const createInfo = await this.productModel.create({
      name,
      description,
      price,
    });
    return createInfo;
  }

  updateProduct({
    id = 0,
    name = '',
    description = '',
    price = 0,
    createdAt = '',
    updatedAt = '',
  }: updateCatalogDto) {
    if (!name) {
      return;
    }

    return this.productModel.update(
      { name, description, price },
      {
        where: {
          id,
        },
      },
    );
  }
}
