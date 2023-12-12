'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert("Discounts", [
      {
        id: "9742ae9a-32e2-4326-83ac-238748363c34",
        value: 10
      },
      {
        id: "76580edd-b8df-4f7b-81a5-c8e4268c821b",
        value: 20
      },
      {
        id: "9c976bf6-4239-42d7-9f71-434374da5837",
        value: 30
      },
      {
        id: "1f7895d4-0fdc-44a6-9905-0a6ed024bac1",
        value: 40
      },
      {
        id: "b9d39173-2b9e-4acc-85f5-e4811c559707",
        value: 50
      },
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Discounts', null, {});
  }
};
