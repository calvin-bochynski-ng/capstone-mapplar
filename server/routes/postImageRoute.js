require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.post("/", async (req, res) => {
  try {
    const post = await knex("post").insert({
      description: req.body.description,
      like: 0,
      user_id: req.body.main_usr_id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
  }
});

router.post("/image", async (req, res) => {
  try {
    const sites = await knex("site");
    const selectedSite = sites.filter(
      (site) =>
        site.latitude - req.body.latitude <= 0.004 &&
        site.latitude - req.body.latitude >= -0.004 &&
        site.longitude - req.body.longitude <= 0.004 &&
        site.longitude - req.body.longitude >= -0.004
    );

    await knex("image").insert({
      image_link: req.body.img_link,
      user_id: req.body.main_usr_id,
      site_id: selectedSite[0].id,
      post_id: req.body.post_id,
    });

    return res.status(201).json("Post Created");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    //lostie - 21, current

    const userPost = await knex("post")
      .where({
        "post.user_id": req.body.main_usr_id,
      })
      .join("user", "user.id", "=", "post.user_id")
      .join("image", "image.post_id", "=", "post.id")
      .join("site", "site.id", "=", "image.site_id")
      .join("destination", "destination.id", "=", "site.destination_id")
      .select(
        "user.avatar",
        "user.username",
        "post.description",
        "post.like",
        "post.created_at",
        "image.image_link",
        "site_name",
        "destination.city"
      );

    const friendPost = await knex("follow")
      .where({
        "follow.user_id": req.body.main_usr_id,
      })
      .join("post", "post.user_id", "=", "follow.friend_id")
      .join("image", "image.post_id", "=", "post.id")
      .join("user", "user.id", "=", "follow.friend_id")
      .join("site", "site.id", "=", "image.site_id")
      .join("destination", "destination.id", "=", "site.destination_id")
      .select(
        "user.avatar",
        "user.username",
        "post.description",
        "post.like",
        "post.created_at",
        "image.image_link",
        "site_name",
        "destination.city"
      );

    const sortedPost = userPost
      .concat(friendPost)
      .sort((a, b) => b.created_at - a.created_at);
    res.status(200).json(sortedPost);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
