/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
        table.string('id').primary();
        table.string('dealer_siret').notNullable()
        table.datetime('ordered_at').notNullable();
        table.datetime('delivered_at').notNullable();

        table.foreign('dealer_siret').references('dealers.siret');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('orders');
};
