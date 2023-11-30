'use strict';
const productCategories = [
    {
        productID:1,
        productCategory:28
    },
    {
        productID:1,
        productCategory:77
    },

    {
        productID:2,
        productCategory:30
    },

    {
        productID:2,
        productCategory:40
    },

    {
        productID:3,
        productCategory:32
    },

    {
        productID:3,
        productCategory:26
    },

    {
        productID:4,
        productCategory:67
    },

    {
        productID:5,
        productCategory:90
    },

    {
        productID:6,
        productCategory:77
    },

    {
        productID:6,
        productCategory:28
    },

    {
        productID:7,
        productCategory:28
    },

    {
        productID:8,
        productCategory:28
    },
    {
        productID:8,
        productCategory:77
    },
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert(productCategories);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete(productCategories);
  },
};
