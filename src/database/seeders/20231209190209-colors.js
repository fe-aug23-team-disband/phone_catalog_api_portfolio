'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert("Colors", [{
      "id": "23ec9d7e-ed3d-479d-9957-097e8e0da39c",
      "name": "Goldenrod",
      "hex": "#f2be06"
    }, {
      "id": "88004bc6-e50e-4c9e-8fb5-6f6635394579",
      "name": "Mauv",
      "hex": "#c89a55"
    }, {
      "id": "6fb99669-36cf-4690-a298-1f969fa4c739",
      "name": "Violet",
      "hex": "#af84ba"
    }, {
      "id": "78b86ced-fcd9-4b95-b166-a7e963908630",
      "name": "Pink",
      "hex": "#7e6279"
    }, {
      "id": "db46149c-e01c-484b-ab55-cbd8bc334096",
      "name": "Teal",
      "hex": "#aab077"
    }, {
      "id": "0fac575d-176e-4326-aad6-59280a08050b",
      "name": "Fuscia",
      "hex": "#63ecab"
    }, {
      "id": "87b268e4-9ab0-4036-b021-02d005a56182",
      "name": "Blue",
      "hex": "#640342"
    }, {
      "id": "c0248510-2b05-4575-8ed7-461508fa18d1",
      "name": "Maroon",
      "hex": "#f458c0"
    }, {
      "id": "7b947bdb-abbb-4284-8ec8-ae097bdcecfc",
      "name": "Khaki",
      "hex": "#f4a97b"
    }, {
      "id": "94b4814c-8745-4fb8-ba49-1405129a96e5",
      "name": "Yellow",
      "hex": "#5f9238"
    }, {
      "id": "2fe2c187-cc44-4e98-a3ef-5f3797069f47",
      "name": "Mauv",
      "hex": "#9b0360"
    }, {
      "id": "d7bcd1c9-c648-4ed5-8b1b-f33d77146ceb",
      "name": "Orange",
      "hex": "#e20402"
    }, {
      "id": "1ef97074-de3b-4eb8-aee0-5f9200daf7b8",
      "name": "Blue",
      "hex": "#ebbc24"
    }, {
      "id": "4fda12d8-b71e-4f8a-8ea7-1118a0ed8914",
      "name": "Fuscia",
      "hex": "#a6090d"
    }, {
      "id": "bd8b8467-66ad-4a90-9361-e15e9d556dd5",
      "name": "Pink",
      "hex": "#e2d1a2"
    }, {
      "id": "cbc199f5-1b22-41e0-93f7-bc8389ddae45",
      "name": "Green",
      "hex": "#ea7214"
    }, {
      "id": "79b0f907-4105-4455-bea9-53eb2649d570",
      "name": "Mauv",
      "hex": "#b81fa3"
    }, {
      "id": "f68dbc8d-736f-4f0a-a666-b3e9db5bf932",
      "name": "Pink",
      "hex": "#0d3b24"
    }, {
      "id": "776f66be-ecf2-459f-bb26-42b8f4ddf763",
      "name": "Crimson",
      "hex": "#4a6231"
    }, {
      "id": "ccdf0e75-20be-4138-acd3-4822b8e1c9ee",
      "name": "Purple",
      "hex": "#288205"
    }])
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Colors', null, {});
  }
};
