'use strict';

require('dotenv').config();

import { Model } from "sequelize";
import {Sequelize} from 'sequelize';

class Database {
    private static instance: Database;
    private sequelize;
    private models: { [key: string]: Model; } | undefined;
    constructor() {
        if (!Database.instance) {
            this.sequelize = new Sequelize({
                dialect: "postgres",
                database: process.env.DB_DEV_NAME,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                host: "127.0.0.1",
            });

            this.initModels();

            this.sequelize.sync();

            Database.instance = this;
        }

        return Database.instance;
    }

    initModels() {
        this.models = {};
    }
}

module.exports = new Database();
