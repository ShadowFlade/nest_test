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

@Table({ modelName: 'products_sections', timestamps: false })
export class ProductsSections extends Model<ProductsSections> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Product)
  @Column
  productID!: number;

  @ForeignKey(() => Section)
  @Column
  sectionID!: number;
}
