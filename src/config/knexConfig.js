const config = require('./config.js');

module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node_db',
        charset: 'utf8'
    },
    pool: {
        max: 10,
        min: 3
    },
    acquireTimeout: 60 * 1000,
    debug: false,
    migrations: {
        directory: '../db_migrations'
    },
    seeds: {
        directory: '../seeds'
    }
}