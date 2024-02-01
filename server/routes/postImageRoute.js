require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.post("/", async (req, res) => {
  console.log(req.body.description);
  try {
    const post = await knex("post").insert({
      description: req.body.description,
      like: 0,
      user_id: req.body.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
  }
});

router.post("/image", async (req, res) => {
  console.log(req.body);
  try {
    const sites = await knex("site");
    const selectedSite = sites.filter(
      (site) =>
        site.latitude - req.body.latitude <= 0.004 &&
        site.latitude - req.body.latitude >= -0.004 &&
        site.longitude - req.body.longitude <= 0.004 &&
        site.longitude - req.body.longitude >= -0.004
    );

    console.log(selectedSite);

    await knex("image").insert({
      image_link: req.body.img_link,
      user_id: req.body.id,
      site_id: selectedSite[0].id,
      post_id: req.body.post_id,
    });

    return res.status(201).json("Post Created");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
