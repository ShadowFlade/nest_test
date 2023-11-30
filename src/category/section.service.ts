import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from './models/category.model.js';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Category)
    private readonly sectionModel: typeof Category,
  ) {}
  
  getSections(limit = 10) {
    return this.sectionModel.findAll({ limit });
  }

  delete(id) {
    if (!id) {
      return;
    }
    return this.sectionModel.destroy({
      where: { id },
    });
  }

  add({ name, description, price, slug }) {
    if (!name || !slug) {
      return;
    }
    return this.sectionModel.create({ name, description, price, slug });
  }

  get(id) {
    return this.sectionModel.findOne({ where: { id } });
  }

  getWithParent(id) {
    return this.sectionModel.findOne({
      where: { id },
      include: [
        {
          model: Category,
        },
      ],
    });
  }

  async getWithChildren(id) {
    const categoryDB = await this.sectionModel.findOne({
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

    const childCategories = await this.sectionModel.findAll({
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
