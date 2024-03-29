/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const destinationData = require("../seed-data/destination");
const siteData = require("../seed-data/site");
const userData = require("../seed-data/user");
const postData = require("../seed-data/post");
const imageData = require("../seed-data/image");

exports.seed = async function (knex) {
  await knex("image").del();
  await knex("site").del();
  await knex("destination").del();
  await knex("user").del();
  await knex("post").del();
  await knex("itinerary").del();
  await knex("follow").del();
  await knex("destination").insert(destinationData);
  await knex("site").insert(siteData);
  await knex("user").insert(userData);
  await knex("post").insert(postData);
  await knex("image").insert(imageData);
};
