'use strict';
const products = [
  {
    name: 'Product 1',
    price: 10.99,
    description: 'Description for Product 1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product 2',
    price: 19.99,
    description: 'Description for Product 2',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product 3',
    price: 13.37,
    description: 'Description for Product 3',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product 4',
    price: 420.00,
    description: 'Description for Product 4',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product 5',
    price: 14.88,
    description: 'Description for Product 5',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product 6',
    price: 69.99,
    description: 'Description for Product 6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product 7',
    price: 10.99,
    description: 'Description for Product 7',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product 8',
    price: 19.99,
    description: 'Description for Product 2',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', products);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', products);
  }
};
