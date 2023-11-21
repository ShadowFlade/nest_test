import { Injectable } from '@nestjs/common';
import { Product } from '../models/Product';
import { FindOptions, Op, Sequelize } from 'sequelize';
import { SectionService } from './section.service';
import { Category } from '../models/Category';

@Injectable()
export class CatalogService {

  async getProducts(filter?) {
    let categoryID;
    let where: any = {};

    if(filter && filter.where){
      where = filter.where;
      const categoryFilter = filter.where.product_category as string | undefined;
      const { dataValues: data } = await Category.findOne({
        where: {
          slug: categoryFilter,
        },
      });
      if (!data.id) {
        return;
      }
      categoryID = data.id
    }

    if (categoryID) {
      console.log('yes category id ',categoryID);
      where.product_category = {
        [Op.contains]: [categoryID],
      };
    }

    console.log(where,' where');

    const productsData = await Product.findAll({
      where,
      limit: 100,
    });
    const ddata = [];
    for(const product of productsData){
      ddata.push(product.dataValues);
    }
    return productsData;
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
