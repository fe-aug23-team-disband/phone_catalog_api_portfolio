'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    for (const percent of [10, 20, 30, 40, 50]) {
      const id= uuidv4()

      await queryInterface.bulkInsert("Discounts", [
        {
          id,
          value: percent
        },
      ])
    }
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Discounts', null, {});
  }
};
