import { Sequelize, DataTypes } from 'sequelize';
import { IProduct } from 'src/controllers/catalog.controller';

const sequelize = new Sequelize('nest_test', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

export const Category = sequelize.define('category', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  slug: DataTypes.STRING,
});

Category.hasMany(Category, {
  as: 'subcategories',
  foreignKey: 'id',
});
