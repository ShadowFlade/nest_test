import { Injectable } from '@nestjs/common';
import { Product } from '../models/Product';
import { FindOptions, Op, Sequelize } from 'sequelize';
import { SectionService } from './section.service';
import { Category, ICategory } from '../models/Category';
import sequelize from 'sequelize/types/sequelize';
import { Helper } from '../utils/Helper';

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
      where.product_category = {
        [Op.contains]: [categoryID],
      };
    }

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
    let sections = await Category.findAll({
      limit: 10,
      // include: {
      //   model: Category,
      //   as: 'Subcategories',
      // },
      order: [['slug', 'asc']],
    });

    // sections = sections.map(item => item.dataValues);
    let sectionsMain = [];
    for (let i = 0; i < sections.length; i++) {
      const id = sections[i].dataValues['id'];
      // sectionsMain[sections[i].dataValues['id']] = [];
      sectionsMain[id] = sections[i].dataValues;
    }

    const subcategories = [];
    sectionsMain.forEach((item, index) => {
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
    let subSections = await Category.findAll({
      order: [['slug', 'asc']],
    });
    const subSectionsMain = [];
    subSections.forEach(
      (item, index) => (subSectionsMain[item.dataValues.id] = item),
    );
    sectionsMain = Helper.formatCategories(sectionsMain, subSectionsMain);

    return sectionsMain.filter((item) => !!item);
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
