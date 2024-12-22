/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    //craete table dealers
    return knex.schema.createTable('dealers', (table) => {
        table.string('siret',14).primary();
        table.string('name').notNullable();
        table.string('phoneNumber').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('dealers');
};
