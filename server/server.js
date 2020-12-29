'use strict';

const express = require('express');

// requiring postgres client module
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'database',
    database: 'postgres',
    password: 'pw123',
    port: 5432,
});
client.connect();

// constants
const PORT = 8080;
const HOST = '0.0.0.0';

// app
const app = express();
app.get('/', async (req, res) => {
    try {
        const data = await client.query('SELECT * FROM homicide_info');
        return res.send(data.rows[3]);
    } catch (error) {
        console.error(error);
        res.status(500).send("--an error has occurred--");
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);