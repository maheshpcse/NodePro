var fs = require('fs');
var sql1 = fs.readFileSync('../stored_procedures/test1.sql').toString();

exports.up = function (knex, Promise) {
    return knex.schema.raw(`${sql1}`)
};

exports.down = function (knex, Promise) {
    return knex.schema.raw(`DROP PROCEDURE IF EXISTS test_user;`)
};