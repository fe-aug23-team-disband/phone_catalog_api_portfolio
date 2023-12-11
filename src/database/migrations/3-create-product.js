'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Products', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      namespaceId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      // Main section
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacityAvailable: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: false,
      },
      priceRegular: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      // Tech specs section
      screen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resolution: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      processor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ram: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      camera: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zoom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cell: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: false,
      },

      time_created: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
      time_updated: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },

      // Ref section
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Categories',
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
      discount_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Discounts',
          key: 'id'
        },
      },
    })
  },

  async down (queryInterface) {
    return queryInterface.dropTable('Products');
  }
};
