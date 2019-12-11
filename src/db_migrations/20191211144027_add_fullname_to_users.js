exports.up = function (knex) {
    knex.schema.table('users', function (table) {
        table.integer('fullname').notNull()
    })
};

exports.down = function (knex) {
    knex.schema.table('users', function (table) {
        table.dropColumn('fullname')
    })
};