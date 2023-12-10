'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Product_Color', {
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
      },
      color_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Colors',
          key: 'id'
        },
      },
    })
  },

  async down (queryInterface) {
    return queryInterface.dropTable('Product_Color');
  }
};
