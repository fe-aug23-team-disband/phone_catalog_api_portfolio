'use strict';

require('dotenv').config();

import express from 'express';
import sequelize from "./database/db";
import cors from 'cors';
import cookieParser from "cookie-parser"

import ProductRouter from "./routers/Product.router";
import OrderRouter from "./routers/Order.router";
import AuthRouter from "./routers/Authentication.router";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors())

app.use('/orders', OrderRouter)
app.use('/auth', AuthRouter)

app.use('/:category', ProductRouter)
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
                retrieveRecommended: {
                    link: '/products/:namespaceId/recommended',
                    queryParams: {
                        category: ['phones', 'tables', 'accessories'],
                        discountValue: 'number | DEFAULT: 10',
                    }
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
