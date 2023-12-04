import { DataTypes } from 'sequelize';
import {config as dotenvConfig} from 'dotenv';
import {sequelize} from '../../../config/db.js';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Product } from '../../catalog/models/product.model.js';
import { ProductsSections } from '../../common/junction_tables/ProductsSections.model.js';

dotenvConfig();

export type ISection = {
  name: string,
  description: string,
  slug: string,
}

@Table({modelName:'sections'})
export class Section extends Model {
  @Column({primaryKey:true, autoIncrement: true})
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  slug:string;

  @BelongsToMany(() => Product, () => ProductsSections)
  categories!: ISection[];
}
