require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.post("/", async (req, res) => {
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
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
