import { DataTypes } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';
import { sequelize } from '../../../config/db.js';
import { BelongsToMany, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from '../../category/models/category.model.js';
import { Product } from '../../catalog/models/product.model.js';

dotenvConfig();

@Table({ modelName: 'products_categories', timestamps: false })
export class ProductsCategories extends Model<ProductsCategories> {
  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @ForeignKey(() => Category)
  @Column
  categoryId!: number;
}