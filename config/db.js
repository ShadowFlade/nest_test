import { Sequelize } from 'sequelize';
import serializeConfig from './config.js';
import { config } from 'dotenv';
config();
export const sequelize = new Sequelize(serializeConfig);
