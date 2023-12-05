'use strict';

require('dotenv').config();

import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Started at http://localhost:${process.env.PORT}/`);
});
