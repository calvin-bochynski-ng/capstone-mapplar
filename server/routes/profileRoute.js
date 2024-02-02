require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/", async (req, res) => {
  // console.log(req.body);
  try {
    const profile = await knex("user")
      .where({ "user.id": req.body.id })
      .select("username", "avatar", "user.id")
      .first();

    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
});

router.get("/destination/:city", async (req, res) => {
  const { city } = req.params;
  console.log(city);

  try {
    const profile = await knex("user")
      .join("itinerary", "user.id", "=", "user_id")
      .join("destination", "destination_id", "=", "destination.id")
      .where({ user_id: req.body.id })
      .where({ City: city })
      .orderBy("itinerary.id", "desc")
      .select("itinerary_description")
      .first();

    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  console.log(userid);

  try {
    const profile = await knex("user")
      .where({ "user.id": userid })
      .select("username", "avatar", "user.id")
      .first();

    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:userid/destination/:city", async (req, res) => {
  const { userid, city } = req.params;
  try {
    const profile = await knex("user")
      .join("itinerary", "user.id", "=", "user_id")
      .join("destination", "destination_id", "=", "destination.id")
      .where({ City: city })
      .where({ user_id: userid })
      .select("itinerary_description")
      .orderBy("itinerary.id", "desc")
      .first();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
