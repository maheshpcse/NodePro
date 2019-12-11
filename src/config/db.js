const config = require('./config.js');

var mysql = require('mysql');

var connection = mysql.createPool({
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.db,
    multipleStatements: true
});

module.exports = connection;