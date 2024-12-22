/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('order_lines', (table) => {
        table.string('order_id').primary();
        table.string('spare_part_reference').primary();
        table.integer('quantity').notNullable();
        table.decimal('unit_price').notNullable();

        table.foreign('order_id').references('orders.id');
        table.foreign('spare_part_reference').references('spare_parts.reference');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('order_lines');
};
