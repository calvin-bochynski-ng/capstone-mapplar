require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const images = await knex("image").where({ site_id: id });
    res.status(200).json(images);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Failed to grab images." });
  }
});

module.exports = router;
