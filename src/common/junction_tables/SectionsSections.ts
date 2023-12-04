import { config as dotenvConfig } from 'dotenv';
import {
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Section } from '../../section/models/section.model.js';
import { Product } from '../../catalog/models/product.model.js';

dotenvConfig();

@Table({ modelName: 'products_categories', timestamps: false })
export class CategoriesCategories extends Model<CategoriesCategories> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Product)
  @Column
  parentCategory!: number;

  @ForeignKey(() => Section)
  @Column
  childCategory!: number;
}
