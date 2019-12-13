exports.seed = function (knex) {
  return knex.raw(`DROP PROCEDURE IF EXISTS test_sp;`)
    .then(function () {
      return knex.raw(`CREATE PROCEDURE test_sp2(id int)
      BEGIN
      SELECT * FROM users where user_id = 2 ;
      END;`).then(function (result) {
        console.dir(result, {
          depth: null
        });
      })
    });
};