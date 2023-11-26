import { Sequelize, DataTypes } from 'sequelize';
import { IProduct } from 'src/controllers/catalog.controller';
import {config as dotenvConfig} from 'dotenv';
import { IDialect } from 'src/main';
dotenvConfig();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as IDialect,
});

export type ICategory = {
  name: string,
  description: string,
  slug: string,
  subcategories: string[]
}

export const Category = sequelize.define('category', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  slug: DataTypes.STRING,
  subcategories: DataTypes.JSONB,
  parentCategory: DataTypes.INTEGER
});

Category.hasMany(Category, {
  foreignKey: 'parentCategory',
});
