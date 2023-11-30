import { DataTypes } from 'sequelize';
import {config as dotenvConfig} from 'dotenv';
import {sequelize} from '../../../config/db.js';
dotenvConfig();

const role = {
  admin: 'admin',
  user: 'user',
} as const;

type IRole = (typeof role)[keyof typeof role];

export type IUser = {
  login: string;
  name?: string;
  password: string;
  role?: IRole;
  refreshToken?: string;
};

export const User = sequelize.define('user', {
  login: DataTypes.STRING,
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  refreshToken: DataTypes.STRING,
});
