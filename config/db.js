import { Sequelize } from 'sequelize';
import serializeConfig from './config.js';
import { config } from 'dotenv';
import { Product } from 'src/catalog/models/product.model.js';
import { Category } from 'src/category/models/category.model.js';
import { User } from 'src/user/models/user.model.js';
config();
const sequelize = new Sequelize(serializeConfig);
sequelize.addModels([Product, Category, User])
export {sequelize};
