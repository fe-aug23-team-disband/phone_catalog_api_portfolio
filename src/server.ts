'use strict';

import sequelize from "./database/db";

require('dotenv').config();

import express from 'express';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    res.send("Hello World")

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
