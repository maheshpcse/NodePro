exports.up = function (knex, Promise) {
    try {
        return knex.schema.createTableIfNotExists('settings', function (table) {
            table.increments('settingId');
            table.string('name', 100).notNullable();
            table.string('value', 50).notNullable();
            table.specificType('status', "enum('Active','Inactive')").notNullable().defaultTo('Active');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    } catch (error) {
        exports.down();
    }
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('settings');
};