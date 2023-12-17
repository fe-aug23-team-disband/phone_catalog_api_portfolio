'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Images', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
      },
      string: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    })
  },

  async down (queryInterface) {
    return queryInterface.dropTable('Images');
  }
};
