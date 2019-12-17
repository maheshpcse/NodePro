var fs = require('fs');
var sql = fs.readFileSync('../stored_procedures/test.sql').toString();

exports.up = function(knex, Promise) {
  return knex.schema.raw(`${sql}`)
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('DROP PROCEDURE IF EXISTS test_task')
};