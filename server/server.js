'use strict';

const express = require('express');

// requiring postgres client module
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'database', // docker creates dns entries for services
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
        const data = await client.query('SELECT * FROM homicide_info LIMIT 3');

        // {"id":"3298","first_name":"Gregory","last_name":"Sinclair","age":"31","gender":"male","race":"black","cause":"shooting","death_loc":"unknown","district":"SE","street_address":"2300 Fleet St","zip_code":"21224","latitude":"39.285140","longitude":"-76.584100","date":"2019-01-12T00:00:00.000Z","time":"19:29:00","notes":"<p>Sinclair was shot after allegedly holding up a liquor store. The case is has been initially deemed self-defense and is pending review by the State's Attorney's Office.&nbsp;</p>"}
        var display;
        for (let i = 1; i < 3; i++) {
            display += data.rows[i].first_name
        }

        return res.send(data.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("--an error has occurred--");
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);