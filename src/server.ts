'use strict';

import sequelize from "./database/db";
import ProductRouter from "./routers/Product.router";

require('dotenv').config();

import express from 'express';

const app = express();

app.use(express.json());

app.use('/products', ProductRouter)

app.get('/', async (req, res) => {
    res.send({
        links: {
            products: [''],
            orders: [''],
        }
    })
})

app.listen(process.env.PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Sequelize-PostgresSQL Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    console.log(`Started at http://localhost:${process.env.PORT}/`);
});
