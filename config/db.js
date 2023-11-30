const { Sequelize } = require('sequelize');
import { serializeConfig } from './config';
import { config as configDotEnv } from 'dotenv';
configDotEnv();

export const sequelize = new Sequelize(serializeConfig);
