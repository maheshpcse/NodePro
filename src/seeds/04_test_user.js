var fs = require('fs');
var sql = fs.readFileSync('../stored_procedures/test.sql').toString();

exports.seed = function (knex) {
  return knex.raw('DROP PROCEDURE IF EXISTS test_user;').then(() => {
    return knex.raw('CREATE PROCEDURE IF NOT EXISTS test_user(IN id INT(100));').then(() => {
      return knex.raw(sql)
    });
  });
};