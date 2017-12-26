var express = require("express");
var bodyParser = require("body-parser");
var socket = require("socket.io");
var cookieParser = require('cookie-parser');
// var methodOverride = require('method-override');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8083;

// Sets up server for sockets
var server = require('http').Server(app);
var io = socket(server);
var routes = require("./routes/routes");
var cookieParser = require('cookie-parser');

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
// app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
app.use("/", routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync(/*{force:true}*/).then(function() {
    server.listen(PORT, function() {
        console.log('Server listening on PORT: ', PORT);
    });
});
