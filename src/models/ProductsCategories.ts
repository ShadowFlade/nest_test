import { Sequelize, DataTypes } from 'sequelize';
import { IProduct } from 'src/controllers/catalog.controller';
import { config as dotenvConfig } from 'dotenv';
import { sequelize } from '../../config/db';

dotenvConfig();

export const ProductsCategories = sequelize.define('products_categories', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  productID: DataTypes.INTEGER,
  categoryID: DataTypes.INTEGER,
});
