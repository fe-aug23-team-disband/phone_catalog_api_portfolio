'use strict';

import sequelize from "./database/db";

require('dotenv').config();

import express from 'express';
import Product from "./models/Product.model";
import Discount from "./models/Discount.model";
import Category from "./models/Category.model";
import Color from "./models/Color.model";

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    const test = await Product.findAll({
        include: [Discount, Category, Color],
    })

    res.send(test)
})

app.listen(process.env.PORT, async () => {
    // eslint-disable-next-line no-console
    try {
        await sequelize.authenticate();
        console.log('Sequelize-PostgresSQL Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    console.log(`Started at http://localhost:${process.env.PORT}/`);
});
