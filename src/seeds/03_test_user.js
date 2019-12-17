exports.seed = function (knex) {
  return knex.raw(`DROP PROCEDURE IF EXISTS test_user;`)
    .then(function () {
      return knex.raw(`CREATE PROCEDURE test_user(IN id int)
      BEGIN
      SELECT * FROM users where user_id = id ;
      END;`).then(function (result) {
        console.dir(result, {
          depth: null
        });
      });
    });
};