require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/", async (req, res) => {
  // console.log(req.body);
  try {
    const profile = await knex("user")
      .join("post", "user_id", "=", "user.id")
      .join("image", "post_id", "=", "post.id")
      .join("site", "site_id", "=", "site.id")
      .join("destination", "destination_id", "=", "destination.id")
      .where({ "user.id": req.body.id })
      .select(
        "user.avatar",
        "user.username",
        "post.description",
        "post.like",
        "post.created_at",
        "image.image_link",
        "site_name",
        "destination.city"
      )
      .orderBy("post.created_at", "desc");

    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
