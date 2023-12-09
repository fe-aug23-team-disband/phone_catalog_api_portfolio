'use strict';

import path from "path";

require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.DB_DEV_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: "127.0.0.1",
    models: [path.join(__dirname, '../models/*.model.ts')]
});

export default sequelize
