// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'clean_code',
      password: 'clean_code',
      database: 'clean_code'
    },
  }

};
