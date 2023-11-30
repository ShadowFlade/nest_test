import { DataTypes } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';
import { sequelize } from '../../../config/db.js';

dotenvConfig();

export const ProductsCategories = sequelize.define('products_categories', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  productID: DataTypes.INTEGER,
  categoryID: DataTypes.INTEGER,
});
