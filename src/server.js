'use strict';
// Required modules
// require('events').EventEmitter.defaultMaxListeners = 200;
// require('./library/cronJob.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('underscore');
var endpoints = require('./routes/routes.js');
var server = require('./config/db.js');
var config = require('./config/config.js');
var Knexx = require('./config/knex.js');
const {
    Model
} = require('objection');
Model.knex(Knexx.knex);
var app = express();

console.log();

// Middleware functions
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use("/uploads", express.static(path.join('uploads')));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// Routes
app.use('/api', server.dbConnection, endpoints);

app.listen(config.server.port, (req, res) => {
    if (config.server.host == '0.0.0.0') {
        config.server.host = 'localhost';
        console.log(`Express server is listening on http://${config.server.host}:${config.server.port}`);
    } else {
        console.log(`Express server is listening on http://${config.server.host}:${config.server.port}`);
    }
});