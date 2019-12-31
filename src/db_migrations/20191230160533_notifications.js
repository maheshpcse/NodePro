exports.up = function (knex, Promise) {
    try {
        return knex.schema.createTableIfNotExists('notifications', function (table) {
            table.increments('notify_id');
            table.string('notification', 100).notNullable();
            table.string('type_of_notify', 100).notNullable();
            table.string('module_name', 100).notNullable();
            table.string('sender_name', 100).notNullable();
            table.string('receiver_name', 100).notNullable();
            table.specificType('status', "enum('0','1')").notNullable().defaultTo('0').comment("0 - Not read, 1 - Read")
            table.integer('user_id', 100);
            table.timestamp('notify_time').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    } catch (error) {
        exports.down();
    }
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notifications');
};