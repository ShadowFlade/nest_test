import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Section } from './models/section.model.js';
import { InjectModel } from '@nestjs/sequelize';
import { SectionsSections } from '../common/junction_tables/SectionsSections.js';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section)
    private readonly sectionModel: typeof Section,
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
    const childCategories = await SectionsSections.findAll({
      where:{
        parentCategory: id
      }
    })
    if(!childCategories){
      return;
    }
    const ids = childCategories.map(item=>item.dataValues.childCategory);
    const categories = Section.findAll({
      where: {
        id: ids
      }
    })

    return categories;
  }
}
