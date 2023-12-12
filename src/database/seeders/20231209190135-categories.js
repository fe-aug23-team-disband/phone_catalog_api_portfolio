'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert("Categories", [
      {
        id: "c683437a-b2bb-4a44-9eed-d57226ac2443",
        name: "phones",
      },
      {
        id: "5fc3c45c-448f-400d-b6fd-d56bbf36fead",
        name: "tablets",
      },
      {
        id: "540521ea-72f5-4d35-8fca-827b0cbc2a1c",
        name: "accessories",
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
