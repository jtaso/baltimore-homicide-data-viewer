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

// promise
client
    .query('SELECT * FROM homicide_info')
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack));

// constants
const PORT = 8080;
const HOST = '0.0.0.0';

// app
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);