exports.up = function (knex, Promise) {
    try {
        return knex.schema.createTableIfNotExists('configurations', function (table) {
            table.increments('configId');
            table.string('config_name', 100).notNullable();
            table.string('userId', 50).notNullable();
            table.string('role', 50).notNullable();
            table.integer('viewConfig', 10).notNullable();
            table.integer('addConfig', 10).notNullable();
            table.integer('updateConfig', 10).notNullable();
            table.integer('deleteConfig', 10).notNullable();
            table.specificType('status', "enum('Active','Inactive')").notNullable().defaultTo('Active');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    } catch (error) {
        exports.down();
    }
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('configurations');
};