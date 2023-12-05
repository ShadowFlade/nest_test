import { Sequelize } from 'sequelize';
import serializeConfig from './config.js';
import { config } from 'dotenv';
import { Product } from 'src/catalog/models/product.model.js';
import { User } from 'src/user/models/user.model.js';
import { Section } from '../src/section/models/section.model.js';
import { SectionsSections } from '../src/common/junction_tables/SectionsSections.js';
import { ProductsSections } from '../src/common/junction_tables/ProductsSections.model.js';
config();
const sequelize = new Sequelize(serializeConfig);
sequelize.addModels([Product, Section, User, SectionsSections, ProductsSections])
export {sequelize};
