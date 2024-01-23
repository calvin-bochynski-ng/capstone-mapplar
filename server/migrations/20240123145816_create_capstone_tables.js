/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("destination", (table) => {
    table.increments("id").primary();
    table.string("city").notNullable();
    table.string("country").notNullable();
    table.string("geolocation").notNullable();
    table.string("description").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("destination");
};
