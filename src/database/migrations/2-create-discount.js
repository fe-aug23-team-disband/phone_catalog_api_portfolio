'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Discounts', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      value: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1
        }
      },
    })
  },

  async down (queryInterface) {
    return queryInterface.dropTable('Discounts');
  }
};
