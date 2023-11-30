import { Sequelize } from 'sequelize';
import serializeConfig from './config.js';
import { config } from 'dotenv';
import { Product } from 'src/catalog/models/product.model.js';
import { Category } from 'src/category/models/category.model.js';
config();
const sequelize = new Sequelize(serializeConfig);
sequelize.addModels([Product, Category])
export {sequelize};
