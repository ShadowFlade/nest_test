'use strict';
const categories = [
  {
    id: 90,
    name: 'Трикотажные юбки',
    slug: 'skirtsTrik',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 51,
    name: 'Джемпера',
    slug: 'sweaters',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 34,
    name: 'Аксессуары',
    slug: 'aksessuary',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 72,
    name: 'Сумки',
    slug: 'bags',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 73,
    name: 'Ремни',
    slug: 'belt',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 46,
    name: 'Блузки',
    slug: 'bluzy',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 67,
    name: 'Сертификаты',
    slug: 'gift',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 112,
    name: 'Женские белые брюки карго',
    slug: 'belye',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 94,
    name: 'Back to school',
    slug: 'skirtsTrik',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 48,
    name: 'Корсеты',
    slug: 'korsety',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', categories);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories',categories);
  },
};
