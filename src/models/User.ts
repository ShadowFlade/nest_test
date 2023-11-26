import { Sequelize, DataTypes } from 'sequelize';
import { IDialect } from 'src/main';
import {config as dotenvConfig} from 'dotenv';
dotenvConfig();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_LOGIN,
	process.env.DB_PASSWORD,
	{
	  host: process.env.DB_HOST,
	  dialect: process.env.DB_DIALECT as IDialect,
	},
  );

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
