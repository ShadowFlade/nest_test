import { DataTypes } from 'sequelize';
import {config as dotenvConfig} from 'dotenv';
import {sequelize} from '../../../config/db.js';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Product } from '../../catalog/models/product.model.js';
import { ProductsCategories } from '../../common/junction_tables/ProductsCategories.model.js';

dotenvConfig();

export type ICategory = {
  name: string,
  description: string,
  slug: string,
}

@Table({modelName:'categories'})
export class Category extends Model {
  @Column({primaryKey:true, autoIncrement: true})
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  slug:string;

  @BelongsToMany(() => Product, () => ProductsCategories)
  categories!: ICategory[];
}
