'use strict';

const {md5} = require("js-md5");
const {v4: uuidv4} = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const salt = md5('salt')
    // const id= uuidv4()

    return queryInterface.bulkInsert("Users", [{
      id: "924d1d37-f338-4865-988d-266dff0f3c1d",
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
