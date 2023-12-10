'use strict';

const {md5} = require("js-md5");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const salt = md5('salt')

    return queryInterface.bulkInsert("Users", [{
      id: "ebbe8b83-d5c7-4533-bb7c-ebc35f01bb64",
      name: "admin",
      email: md5("admin@admin.com" + salt),
      password: "admin",
      salt: salt
    }])
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
