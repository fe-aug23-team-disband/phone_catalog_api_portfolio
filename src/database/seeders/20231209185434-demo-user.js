'use strict';

const {md5} = require("js-md5");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const salt = md5('salt')

    await queryInterface.bulkInsert("Users", [{
      id: "924d1d37-f338-4865-988d-266dff0f3c1d",
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
