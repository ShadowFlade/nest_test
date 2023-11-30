import { DataTypes } from 'sequelize';
import {config as dotenvConfig} from 'dotenv';
import {sequelize} from '../../config/db.js';

dotenvConfig();



export type ICategory = {
  name: string,
  description: string,
  slug: string,
}

export const Category = sequelize.define('category', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  slug: DataTypes.STRING,
});
