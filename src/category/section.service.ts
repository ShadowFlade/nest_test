import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from './models/category.model.js';

@Injectable()
export class SectionService {
  getSections(limit = 10) {
    return Category.findAll({ limit });
  }

  delete(id) {
    if (!id) {
      return;
    }
    return Category.destroy({
      where: { id },
    });
  }

  add({ name, description, price, slug }) {
    if (!name || !slug) {
      return;
    }
    return Category.create({ name, description, price, slug });
  }

  get(id) {
    return Category.findOne({ where: { id } });
  }

  getWithParent(id) {
    return Category.findOne({
      where: { id },
      include: [
        {
          model: Category,
        },
      ],
    });
  }

  async getWithChildren(id) {
    const categoryDB = await Category.findOne({
      where: { id },
    });

    if (!categoryDB) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    const category = categoryDB.dataValues;
    const childCategoriesIDs = JSON.parse(category.subcategories);
    
    if (!childCategoriesIDs || childCategoriesIDs.length == 0) {
      return category;
    }

    const childCategories = await Category.findAll({
      where: {
        id: [childCategoriesIDs],
      },
    });

    if(!childCategories){
      return category;
    }
    
    category.subcategories = childCategories;
    return category;

  }
}
