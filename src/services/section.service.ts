import { Injectable } from '@nestjs/common';
import { Category } from '../models/Category';
import { FindOptions } from 'sequelize';

@Injectable()
export class SectionService {
  
  getSections(limit = 10) {
    return Category.findAll({ limit });
  }

  deleteCategory(id) {
    if (!id) {
      return;
    }
    return Category.destroy({
      where: { id },
    });
  }

  addCategory({ name, description, price, slug }) {
    if (!name || !slug) {
      return;
    }
    return Category.create({ name, description, price, slug });
  }
}
