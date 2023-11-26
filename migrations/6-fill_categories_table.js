'use strict';
const categories = [
  {
    id: 90,
    name: 'Трикотажные юбки',
    slug: 'skirtsTrik',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    subcategories: '["48"]',
    parentCategory: 51,
  },
  {
    id: 51,
    name: 'Джемпера',
    slug: 'sweaters',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    subcategories: '["77", "51"]',
  },
  {
    id: 34,
    name: 'Аксессуары',
    slug: 'aksessuary',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    subcategories: '["67", "45"]',
  },
  {
    id: 72,
    name: 'Сумки',
    slug: 'bags',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    subcategories: '["65", "109"]',
  },
  {
    id: 73,
    name: 'Ремни',
    slug: 'belt',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    subcategories: '["82", "131"]',
  },
  {
    id: 46,
    name: 'Блузки',
    slug: 'bluzy',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    subcategories: '["50", "129"]',
  },
  {
    id: 67,
    name: 'Сертификаты',
    slug: 'gift',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    subcategories: '["28"]',
  },
  {
    id: 112,
    name: 'Женские белые брюки карго',
    slug: 'belye',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    subcategories: '["36", "113"]',
  },
  {
    id: 94,
    name: 'Back to school',
    slug: 'skirtsTrik',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    subcategories: '["28", "110"]',
  },
  {
    id: 48,
    name: 'Корсеты',
    slug: 'korsety',
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    parentCategory: 90,
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
