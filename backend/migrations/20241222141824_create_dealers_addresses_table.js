/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('dealers_addresses', (table) => {
        table.increments('id').primary();
        table.string('streets').notNullable();
        table.string('city').notNullable();
        table.string('postalCodes').notNullable();
        table.string('country').notNullable();
    });

    await knex.schema.table('dealers', (table) => {
        table.integer('address_id').unsigned().notNullable();
        table.foreign('address_id').references('dealers_addresses.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async  function(knex) {
    await knex.schema.table('dealers', (table) => {
        table.dropColumn('address_id');
    });
    await knex.schema.dropTable('dealers_addresses');
};
