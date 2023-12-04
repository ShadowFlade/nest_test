import { DataTypes } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';
import { sequelize } from '../../../config/db.js';
import { Section, ISection } from '../../section/models/section.model.js';
import { ProductsSections } from '../../common/junction_tables/ProductsSections.model.js'
import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
dotenvConfig();


export type IProduct = {
  id:number;
  name: string;

  price: number;

  description: string;

  createdAt:string | Date;

  updatedAt:string | Date;
}

export type IProductCategoriesJuncTable = {
  id:number;
  productCategory: number;
  productID: number;
}

@Table({modelName:'products'})
export class Product extends Model {
  @Column({primaryKey:true, autoIncrement: true})
  id: number;
  @Column
  name: string;

  @Column
  price: number;

  @Column
  description: string;

  @Column({type: DataTypes.DATE})
  createdAt;

  @Column({type: DataTypes.DATE})
  updatedAt

  @BelongsToMany(() => Section, () => ProductsSections)
  sections!: ISection[];
}
