'use strict';

const {v4: uuidv4} = require("uuid");
const slugify = require("slugify");
const path = require("path");
const {readdir, readFile} = require("node:fs/promises");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const pathToData = path.join(__dirname, '../../../', 'json_data')
    const pathToImgData = path.join(__dirname, '../../../', 'img_data')
    const files = await readdir(pathToData);

    try {
      for (const file of files) {
        const rawData = await readFile(path.join(pathToData, file))
        const data = JSON.parse(rawData.toString())
        const product_id= uuidv4()

        await queryInterface.bulkInsert("Products", [
          {
            id: product_id,
            namespaceId: slugify(data.name, { lower: true, replacement: '-' }),

            name: data.name,
            capacityAvailable: data.capacityAvailable,
            capacity: data.capacity,
            priceRegular: data.priceRegular,

            screen: data.screen,
            resolution: data.resolution,
            processor: data.processor,
            ram: data.ram,
            camera: data.camera,
            zoom: data.zoom,
            cell: data.cell,

            color_id: "ccdf0e75-20be-4138-acd3-4822b8e1c9ee",
            category_id: "ebbe8b83-d5c7-4533-bb7c-ebc35f01bb64",
            discount_id: "9742ae9a-32e2-4326-83ac-238748363c34"
          }
        ])

        for (const description of data.description) {
          const id = uuidv4()

          await queryInterface.bulkInsert("Descriptions", [
            {
              id,
              product_id,
              title: description.title,
              text: description.text
            }
          ])
        }

        for (const imagePath of data.images) {
          const id = uuidv4()

          const img_buffer = await readFile(
              path.join(pathToImgData, imagePath.replace('img', '').replace('phones', ''))
          )

          await queryInterface.bulkInsert("Images", [
            {
              id,
              product_id,
              string: img_buffer.toString('base64')
            }
          ])
        }
      }
    } catch (e) {
      console.log(e)
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Images', null, {});
    await queryInterface.bulkDelete('Descriptions', null, {});
    await queryInterface.bulkDelete('Product_Color', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  }
};
