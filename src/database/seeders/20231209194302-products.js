'use strict';

const { v4: uuidv4 } = require('uuid');
const slugify = require("slugify");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const product_id= uuidv4()

    await queryInterface.bulkInsert("Products", [
      {
        id: product_id,
        namespaceId: slugify("Apple iPhone 8 64GB Silver", { lower: true, replacement: '-' }),

        name: "Apple iPhone 8 64GB Silver",
        capacityAvailable: ["64GB"],
        capacity: "64GB",
        priceRegular: 600,

        screen: "4.7' IPS",
        resolution: "1334x750",
        processor: "Apple A11 Bionic",
        ram: "2GB",
        camera: "12 Mp + 7 Mp",
        zoom: "Digital, 5x",
        cell: ["GPRS", "EDGE", "WCDMA", "UMTS", "HSPA", "LTE"],

        color_id: "ccdf0e75-20be-4138-acd3-4822b8e1c9ee",
        category_id: "22cb577b-8742-4248-88d9-4afce0575821",
        discount_id: "9742ae9a-32e2-4326-83ac-238748363c34"
      }
    ])

    await queryInterface.bulkInsert("Product_Color", [
      {
        product_id,
        color_id: "23ec9d7e-ed3d-479d-9957-097e8e0da39c"
      },
      {
        product_id,
        color_id: "88004bc6-e50e-4c9e-8fb5-6f6635394579"
      },
      {
        product_id,
        color_id: "6fb99669-36cf-4690-a298-1f969fa4c739"
      },
    ])

    await queryInterface.bulkInsert("Images", [
      {
        id: "baa6bf55-45fe-43a6-a99e-dc67deddd383",
        product_id,
        string: "img/phones/apple-iphone-8/silver/00.jpg"
      },
      {
        id: "a666409d-f673-4193-a0a5-ea9610b92dce",
        product_id,
        string: "img/phones/apple-iphone-8/silver/01.jpg"
      },
      {
        id: "68395041-119c-497f-8885-c539f0624e92",
        product_id,
        string: "img/phones/apple-iphone-8/silver/02.jpg"
      },
    ])

    await queryInterface.bulkInsert("Descriptions", [
      {
        id: "691edc82-0294-4519-ba68-7339d5693437",
        product_id,
        title: "And then there was Pro",
        text: [
          "A transformative triple-camera system that adds tons of capability without complexity.",
          "An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro."
        ]
      }
    ])
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
