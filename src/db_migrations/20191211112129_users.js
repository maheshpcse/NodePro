exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments('user_id');
    table.string('firstname', 100).notNullable();
    table.string('lastname', 100).notNullable();
    table.string('username', 100).notNullable();
    table.string('email', 100).notNullable();
    table.string('password', 100).notNullable().defaultTo('1234')
    table.string('phonenumber', 20).notNullable().defaultTo('9876543210');
    table.string('role', 20).notNullable().defaultTo('user');
    table.specificType('assigned_roles', "enum('user', 'manager', 'admin')").notNullable();
    table.string('designation', 100).notNullable();
    table.string('department', 100).notNullable();
    table.string('profilePath', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};