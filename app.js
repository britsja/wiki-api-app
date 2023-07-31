const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'});
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use(express.static("public"));

const URI = process.env.ATLAS_URI;

app.listen(3000, function() {
    console.log("Listening on port 3000");
})

mongoose.connect(URI);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/", function(req, res) {
    res.send("Use /articles to get API data")    
})

app.get("/articles", function(req, res) {
    try {
    Article.find().then((data) => {
        if (data.length > 0) {
            const returnedArticles = data;
            res.send(data);
        } else {
            res.send("Database is empty");
        }
    });
    } catch {
        res.send("Error getting data from database");
    }
    
});

app.post("/articles", async function(req, res) {
    try {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        await newArticle.save();
        res.send("Article Submitted");
    } catch {
        res.send("Cannot Save Article - Please ensure you are using title and content for the form names")
    }
});

app.delete("/articles", async function(req, res) {
    try {
        await Article.deleteMany();
        res.send("Articles Deleted")
    } 
    catch {
        res.send("Error deleting all articles")
    }   
});

