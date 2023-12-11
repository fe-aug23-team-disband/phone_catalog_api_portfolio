'use strict';

const {md5} = require("js-md5");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const salt = md5('salt')

    return queryInterface.bulkInsert("Users", [{
      id: "ebbe8b83-d5c7-4533-bb7c-ebc35f01bb64",
      name: "admin",
      email: "admin@admin.com",
      password: md5('password' + salt),
      salt: salt
    }])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
