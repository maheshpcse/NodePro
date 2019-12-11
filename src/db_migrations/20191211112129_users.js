exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
      table.increments('user_id');
      table.string('email', 100).notNullable();
      table.string('password', 100).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};