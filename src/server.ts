'use strict';

require('dotenv').config();

import express from 'express';
import sequelize from "./database/db";

import ProductRouter from "./routers/Product.router";

const app = express();

app.use(express.json());

app.use('/products', ProductRouter)

app.get('/', async (req, res) => {
    res.send({
        links: {
            products: {
                retrieveProducts: {
                    link: '/products',
                    queryParams: {
                        category: ['phones', 'tables', 'accessories'],
                        limit: 'number | DEFAULT: 10',
                        page: 'number',
                        query: 'string'
                    }
                },
                retrieveSingleProduct: {
                    link: '/products/:namespaceId',
                    queryParams: null,
                },
                retrieveHotPrice: {
                    link: '/products/specials/hot-price',
                    queryParams: {
                        category: ['phones', 'tables', 'accessories'],
                        limit: 'number | DEFAULT: 10',
                    }
                },
                retrieveLatest: {
                    link: '/products/specials/latest',
                    queryParams: {
                        category: ['phones', 'tables', 'accessories'],
                        limit: 'number | DEFAULT: 10',
                    }
                },
            },
            orders: {},
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
