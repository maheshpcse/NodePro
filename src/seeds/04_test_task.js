exports.seed = function (knex) {
  return knex.raw('DROP PROCEDURE IF EXISTS test_task;').then(() => {
    return knex.raw(`CREATE PROCEDURE IF NOT EXISTS test_task(IN id INT);
    BEGIN
    SELECT * FROM tasks where task_id = id ;
    END;`).then(function (result) {
        console.dir(result, {
          depth: null
        });
      });
  });
};