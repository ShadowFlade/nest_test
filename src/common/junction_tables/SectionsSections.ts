import { config as dotenvConfig } from 'dotenv';
import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Section } from '../../section/models/section.model.js';
import { Product } from '../../catalog/models/product.model.js';

dotenvConfig();

@Table({ modelName: 'sections_sections', timestamps: false })
export class SectionsSections extends Model<SectionsSections> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;


  // @Column
  // parentCategory!: number;

  // @Column
  // childCategory!: number;


  @ForeignKey(() => Section)
  @Column
  parentCategory!: number;

  @ForeignKey(() => Section)
  @Column
  childCategory!: number;


}
