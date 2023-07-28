const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'});
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

const URI = process.env.ATLAS_URI;

app.listen(3000, function() {
    console.log("Listening on port 3000");
})

mongoose.connect(URI);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

app.get("/", function(req, res) {
    res.send(`<h1>Wiki API</h1><p>${URI}</p>`);
})