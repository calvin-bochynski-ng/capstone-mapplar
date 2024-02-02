require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.post("/", async (req, res) => {
  try {
    const follow = await knex("follow").insert({
      user_id: req.body.main_usr_id,
      friend_id: req.body.id,
    });
    res.status(201).send("friends");
  } catch (error) {
    console.log(error);
  }
});

router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const follow = await knex("follow")
      .where({ friend_id: userid })
      .where({ user_id: req.body.main_usr_id })
      .first();
    res.status(200).json(follow);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const follow = await knex("follow")
      .where({ user_id: req.body.main_usr_id })
      .where({ friend_id: userid })
      .del();

    res.status(203).send("done");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
