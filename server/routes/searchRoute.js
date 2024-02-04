require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const profile = await knex("user")
      .where({ username: username })
      .select("username", "avatar", "user.id")
      .first();
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).send("Not found");
  }
});

module.exports = router;
