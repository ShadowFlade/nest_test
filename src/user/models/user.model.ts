import { DataTypes } from 'sequelize';
import {config as dotenvConfig} from 'dotenv';
import {sequelize} from '../../../config/db.js';
import { Column, Model, Table } from 'sequelize-typescript';
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


@Table({modelName:'users'})
export class User extends Model {
  @Column({primaryKey:true, autoIncrement: true})
  id: number;

  @Column
  name: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  refreshToken: string;
}