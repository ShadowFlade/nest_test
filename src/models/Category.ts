import { Sequelize, DataTypes } from 'sequelize';
import { IProduct } from 'src/controllers/catalog.controller';
import {config as dotenvConfig} from 'dotenv';
import { IDialect } from 'src/main';
const sequelize = require('../../db/db');

dotenvConfig();



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
