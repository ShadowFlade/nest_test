import { Injectable } from '@nestjs/common';
import { Product } from '../models/Product';
import { FindOptions, Op, Sequelize } from 'sequelize';
import { SectionService } from './section.service';
import { Category } from '../models/Category';
import sequelize from 'sequelize/types/sequelize';

@Injectable()
export class CatalogService {
  async getProducts(filter?) {
    let categoryID;
    let where: any = {};

    if (filter && filter.where) {
      where = filter.where;
      const categoryFilter = filter.where.product_category as
        | string
        | undefined;
      const { dataValues: data } = await Category.findOne({
        where: {
          slug: categoryFilter,
        },
      });
      if (!data.id) {
        return;
      }
      categoryID = data.id;
    }

    if (categoryID) {
      console.log('yes category id ', categoryID);
      where.product_category = {
        [Op.contains]: [categoryID],
      };
    }

    console.log(where, ' where');

    const productsData = await Product.findAll({
      where,
      limit: 100,
    });
    const data = [];
    for (const product of productsData) {
      data.push(product.dataValues);
    }
    return productsData;
  }

  async getAllSections() {
    const sections = await Category.findAll({
      limit: 20,
      include: {
        model: Category,
        as: 'subcategories',
      },
      order: ['slug', 'asc'],
    });
    console.log(sections, ' sections');
    return sections;
  }
  deleteProduct(id) {
    if (!id) {
      return;
    }
    return Product.destroy({
      where: { id },
    });
  }

  addProduct({ name, description, price }) {
    if (!name) {
      return;
    }
    return Product.create({ name, description, price });
  }
}
