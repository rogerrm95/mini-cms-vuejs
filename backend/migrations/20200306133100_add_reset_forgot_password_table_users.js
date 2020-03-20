exports.up = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.string('passResetToken')
        table.date('tokenExpires')
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('passResetToken')
        table.dropColumn('tokenExpires')
    })
}
