'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Colors', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hex: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },

  async down (queryInterface) {
    return queryInterface.dropTable('Colors');
  }
};
