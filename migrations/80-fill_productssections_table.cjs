'use strict';
const productCategories = [
    {
        productID:1,
        sectionID:28
    },
    {
        productID:1,
        sectionID:77
    },

    {
        productID:2,
        sectionID:30
    },

    {
        productID:2,
        sectionID:40
    },

    {
        productID:3,
        sectionID:32
    },

    {
        productID:3,
        sectionID:26
    },

    {
        productID:4,
        sectionID:67
    },

    {
        productID:5,
        sectionID:90
    },

    {
        productID:6,
        sectionID:77
    },

    {
        productID:6,
        sectionID:28
    },

    {
        productID:7,
        sectionID:28
    },

    {
        productID:8,
        sectionID:28
    },
    {
        productID:8,
        sectionID:77
    },
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products_sections', productCategories);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products_sections', productCategories);
  },
};
