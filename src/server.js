'use strict';
// Required modules
// require('events').EventEmitter.defaultMaxListeners = 200;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const endpoints = require('./routes/routes.js');
const config = require('./config/config.js');
const Knexx = require('./config/knex.js');
const {
    Model
} = require('objection');
Model.knex(Knexx.knex);
var app = express();

// Middleware functions
app.use(express.static(path.join(__dirname + 'public')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api', endpoints);

app.listen(config.server.port, (req, res) => {
    console.log(`Express server is running on http://${config.server.host}:${config.server.port}`);
});