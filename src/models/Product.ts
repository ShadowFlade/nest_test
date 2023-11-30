import { DataTypes } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';
import { sequelize } from '../../config/db.js';
import { Category } from './Category.js';
import { ProductsCategories } from './ProductsCategories.js';
dotenvConfig();

export const Product = sequelize.define('product', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: DataTypes.STRING,
  price: DataTypes.NUMBER,
  description: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});
Product.belongsToMany(Category, { through: ProductsCategories });
