import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('nest_test', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
  });

const role = {
	admin: "admin",
	user: "user"
} as const;

type IRole = typeof role[keyof typeof role];

export type IUser = {
	login: string,
	name: string,
	password: string,
	role: IRole
}

export const User = sequelize.define('user', {
	login: DataTypes.STRING,
	name: DataTypes.STRING,
	password: DataTypes.STRING,
	role: DataTypes.STRING
  });