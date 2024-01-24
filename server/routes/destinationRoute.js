require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const authorize = require("../utils/authorize");

router.get("/", authorize, async (_req, res) => {
  try {
    const destination = await knex("destination");
    res.status(200).json(destination);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Failed to grab destination." });
  }
});

router.get("/:id", authorize, async (req, res) => {
  const { id } = req.params;
  try {
    const sites = await knex("site").where({ destination_id: id });
    res.status(200).json(sites);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Failed to grab sites." });
  }
});

module.exports = router;
