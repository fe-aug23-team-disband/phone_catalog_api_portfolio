'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const cat_1_id = uuidv4()
    const cat_2_id = uuidv4()
    const cat_3_id = uuidv4()

    return queryInterface.bulkInsert("Categories", [
      {
        id: cat_1_id,
        name: "phones",
      },
      {
        id: cat_2_id,
        name: "tablets",
      },
      {
        id: cat_3_id,
        name: "accessories",
      }
    ])
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
