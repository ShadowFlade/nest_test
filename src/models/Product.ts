import { Sequelize, DataTypes } from 'sequelize';
import { IProduct } from 'src/controllers/catalog.controller';
import { config as dotenvConfig } from 'dotenv';
import { sequelize } from '../../config/db';
import { Category } from './Category';
import { ProductsCategories} from './ProductsCategories'
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
