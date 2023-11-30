import { DataTypes } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';
import { sequelize } from '../../../config/db.js';
import { Category, ICategory } from '../../category/models/category.model.js';
import { ProductsCategories } from '../../common/junction_tables/ProductsCategories.model.js'
import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
dotenvConfig();


@Table({modelName:'products'})
export class Product extends Model {
  @Column({primaryKey:true, autoIncrement: true})
  name: string;

  @Column
  price: number;

  @Column
  description: string;

  @Column({type: DataTypes.DATE})
  createdAt;

  @Column({type: DataTypes.DATE})
  updatedAt

  @BelongsToMany(() => Category, () => ProductsCategories)
  categories!: ICategory[];
}
