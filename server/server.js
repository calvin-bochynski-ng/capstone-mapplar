require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const knex = require("knex")(require("./knexfile"));

const destinationRoute = require("./routes/destinationRoute");
const PORT = process.env.PORT || 8080;
const SERVER_API_URL = process.env.API_URL;

app.use(express.json());
app.use(cors());

app.use("/destination", destinationRoute);

app.post("/signup", async (req, res) => {
  const { username, first_name, last_name, phone_number, email, password } =
    req.body;

  if (
    !username ||
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !phone_number
  ) {
    return res.status(400).send("Please enter the required fields.");
  }

  const validateEmail = email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  const validatePhoneNumber = phone_number.match(
    /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi
  );

  if (!validateEmail)
    return res.status(400).send("contact_email is not a valid email");
  if (!validatePhoneNumber)
    return res.status(400).send("contact_phone is not a valid phone number");

  const hashedPassword = bcrypt.hashSync(password, 6);

  const newUser = {
    username,
    first_name,
    last_name,
    phone_number,
    email,
    role: "standard user",
    password: hashedPassword,
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  };

  try {
    await knex("user").insert(newUser);
    return res.status(201).json(newUser.username);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed registration" });
  }
});

app.listen(
  PORT,
  console.log(`Server has been started at ${SERVER_API_URL}:${PORT}`)
);
