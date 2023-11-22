import { Sequelize, DataTypes } from 'sequelize';
import { IProduct } from 'src/controllers/catalog.controller';

const sequelize = new Sequelize('nest_test', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

export type ICategory = {
  name: string,
  description: string,
  slug: string,
  subcategories: string[]
}

export const Category = sequelize.define('category', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  slug: DataTypes.STRING,
  subcategories: DataTypes.JSONB
});

// Category.hasMany(Category, {
//   as: 'Subcategories',
//   foreignKey: 'id',
// });
