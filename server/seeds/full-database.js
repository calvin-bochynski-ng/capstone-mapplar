/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const destinationData = require("../seed-data/destination");
const siteData = require("../seed-data/site");

exports.seed = async function (knex) {
  await knex("site").del();
  await knex("destination").del();
  await knex("destination").insert(destinationData);
  await knex("site").insert(siteData);
};
