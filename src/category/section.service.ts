import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from './models/category.model.js';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesCategories } from '../common/junction_tables/CategoriesCategories.js';

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

  async getWithChildren(id) {
    const categoryDB = await this.sectionModel.findOne({
      where: { id },
    });

    if (!categoryDB) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    const category = categoryDB.dataValues;
    const childCategories = await CategoriesCategories.findAll({
      where: {
        parentCategory: category.id,
      },
    });


    childCategories.push(category);
    return childCategories;
  }
}
