var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
const dbConfig = require("./config/database.config.js");

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });

const Bookmark = require("./api/models/bookmark_model");
const Tag = require("./api/models/tag_model");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./api/routes");
app.use("/", routes);

app.get("/", function(req, res, next) {
  res.status(403).send("FORBIDDEN");
});

app.listen(port, function() {
  console.log(" REST API server Started on " + port);
});
