import { Sequelize, DataTypes } from 'sequelize';
import { IProduct } from 'src/controllers/catalog.controller';
import {config as dotenvConfig} from 'dotenv';
import { IDialect } from 'src/main';
dotenvConfig();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as IDialect,
});

export const Product = sequelize.define<any, IProduct>('product', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: DataTypes.STRING,
  price: DataTypes.NUMBER,
  description: DataTypes.STRING,
  product_category: DataTypes.JSON,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});
