/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("destination", (table) => {
      table.increments("id").primary();
      table.string("city").notNullable();
      table.string("country").notNullable();
      table.string("longitude").notNullable();
      table.string("latitude").notNullable();
      table.string("description").notNullable();
    })
    .createTable("site", (table) => {
      table.increments("id").primary();
      table.string("site_name").notNullable();
      table.string("site_description").notNullable();
      table.string("longitude").notNullable();
      table.string("latitude").notNullable();
      table
        .integer("destination_id")
        .unsigned()
        .references("destination.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("phone_number").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("role").notNullable();
      table.string("avatar").notNullable();
    })
    .createTable("itinerary", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("destination_id")
        .unsigned()
        .references("destination.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("pdf_link").notNullable();
      table.text("itinerary_description").notNullable();
    })
    .createTable("post", (table) => {
      table.increments("id").primary();
      table.string("description").notNullable();
      table.integer("like").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("image", (table) => {
      table.increments("id").primary();
      table.string("image_link").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("site_id").unsigned().references("site.id");
      table.integer("post_id").unsigned().references("post.id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("follow", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("friend_id").unsigned();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("image")
    .dropTable("post")
    .dropTable("itinerary")
    .dropTable("user")
    .dropTable("site")
    .dropTable("destination");
};
