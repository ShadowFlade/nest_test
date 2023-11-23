import { Sequelize, DataTypes } from 'sequelize';
import { IProduct } from 'src/controllers/catalog.controller';

const sequelize = new Sequelize('nest_test', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

export const Product = sequelize.define<any, IProduct>('product', {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: DataTypes.STRING,
  price: DataTypes.NUMBER,
  description: DataTypes.STRING,
  product_category: DataTypes.JSON,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});
