exports.up = function (knex, Promise) {
    try {
        return knex.schema.createTableIfNotExists('tasks', function (table) {
            table.increments('task_id');
            table.string('title', 100).notNullable();
            table.string('description', 100).notNullable();
            table.boolean('is_complete').notNullable().defaultTo(false);
            table.integer('user_id', 100);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    } catch (error) {
        exports.down();
    }
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('tasks');
};