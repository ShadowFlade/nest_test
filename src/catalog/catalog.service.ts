import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './models/product.model.js';
import { Op} from 'sequelize';
import { Category} from '../category/models/category.model.js';
import { Helper } from '../common/utils/Helper.js';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    @InjectModel(Category)
    private readonly sectionModel: typeof Category,
  ) {}
  async getProducts(filter?) {
    let categoryID;
    let where: any = {};

    if (filter && filter.where) {
      where = filter.where;
      const categoryFilter = filter.where.product_category as
        | string
        | undefined;
      const { dataValues: data } = await this.productModel.findOne({
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

    const productsData = await this.productModel.findAll({
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
    let sections = await this.productModel.findAll({
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
    subSections.forEach(
      (item) => (subSectionsMain[item.dataValues.id] = item),
    );
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
      throw new HttpException('No product name',HttpStatus.BAD_REQUEST);
    }
    const createInfo = await this.productModel.create({ name, description, price });
    return createInfo;
  }

  updateProduct({ id, name, description = '', price }) {
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
