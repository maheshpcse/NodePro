'use strict';
// Required modules
// require('events').EventEmitter.defaultMaxListeners = 200;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('underscore');
const endpoints = require('./routes/routes.js');
const config = require('./config/config.js');
const Knexx = require('./config/knex.js');
const {
    Model
} = require('objection');
Model.knex(Knexx.knex);
var app = express();

var arr = [{
    name: 'akv',
    location: 'vizag'
}, {
    name: 'akv',
    location: 'hyderabad'
}, {
    name: 'akv',
    location: 'chennai'
}, {
    name: 'infosys',
    location: 'hyderabad'
}, {
    name: 'tech-mahindra',
    location: 'vizag'
}];

var arr1 = [1, 2, 1, 3, 1, 0, [1, 2, 0],
    [2, 3, 0], 4, 5, 4, 7
];

// console.log( _.uniq(arr));

var lyrics = [{
        line: 1,
        words: "I'm a lumberjack and I'm okay"
    },
    {
        line: 2,
        words: "I sleep all night and I work all day"
    },
    {
        line: 3,
        words: "He's a lumberjack and he's okay"
    },
    {
        line: 4,
        words: "He sleeps all night and he works all day"
    }
];

var result = _.chain(lyrics)
    .map(function (line) {
        return line.words.split(' ');
    })
    .flatten()
    .reduce(function (counts, word) {
        counts[word] = (counts[word] || 0) + 1;
        return counts;
    }, {})
    .value();

// console.log(result);


// Middleware functions
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/uploads", express.static(path.join('uploads')));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// Routes
app.use('/api', endpoints);

app.listen(config.server.port, (req, res) => {
    console.log(`Express server is listening on http://${config.server.host}:${config.server.port}`);
});