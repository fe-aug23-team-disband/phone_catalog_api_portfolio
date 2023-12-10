'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert("Categories", [
      {
        id: "ebbe8b83-d5c7-4533-bb7c-ebc35f01bb64",
        name: "phones",
      },
      {
        id: "22cb577b-8742-4248-88d9-4afce0575821",
        name: "tablets",
      },
      {
        id: "7f1eea6e-17cf-4bab-bf35-8632a868d40d",
        name: "accessories",
      }
    ])
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
