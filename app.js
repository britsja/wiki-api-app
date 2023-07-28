const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const URI = process.env.API_TEST;

app.listen(3000, function() {
    console.log("Listening on port 3000");
})

app.get("/", function(req, res) {
    res.send(`<h1>Wiki API</h1><p>${URI}</p>`);
})