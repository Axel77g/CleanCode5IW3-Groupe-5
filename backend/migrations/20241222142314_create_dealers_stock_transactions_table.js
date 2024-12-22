/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('dealers_stock_transactions', (table) => {
        table.string('id').primary();
        table.string('dealer_siret').notNullable();
        table.string('spare_part_reference').notNullable();
        table.integer('quantity').notNullable();
        table.datetime('transaction_at').notNullable();

        table.foreign('dealer_siret').references('dealers.siret');
        table.foreign('spare_part_reference').references('spare_parts.reference');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('dealers_stock_transactions');
};
