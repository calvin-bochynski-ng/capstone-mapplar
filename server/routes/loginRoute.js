require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send("Please enter the required fields in this login page");
  }

  try {
    const user = await knex("user").where({ username: username }).first();
    console.log(user);

    const passwordCorrect = bcrypt.compareSync(password, user.password);

    if (!passwordCorrect) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed login" });
  }
});

module.exports = router;
