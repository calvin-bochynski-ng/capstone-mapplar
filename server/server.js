require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const knex = require("knex")(require("./knexfile"));

const destinationRoute = require("./routes/destinationRoute");
const signupRoute = require("./routes/signupRoute");
const PORT = process.env.PORT || 8080;
const SERVER_API_URL = process.env.API_URL;

app.use(express.json());
app.use(cors());

app.use("/destination", destinationRoute);
app.use("/signup", signupRoute);

app.listen(
  PORT,
  console.log(`Server has been started at ${SERVER_API_URL}:${PORT}`)
);
