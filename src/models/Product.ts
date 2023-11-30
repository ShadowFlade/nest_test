import { Sequelize, DataTypes } from 'sequelize';
import { IProduct } from 'src/controllers/catalog.controller';
import { config as dotenvConfig } from 'dotenv';
import { sequelize } from '../../config/db';

dotenvConfig();

export const Product = sequelize.define('product', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: DataTypes.STRING,
  price: DataTypes.NUMBER,
  description: DataTypes.STRING,
  product_category: DataTypes.JSON,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});
