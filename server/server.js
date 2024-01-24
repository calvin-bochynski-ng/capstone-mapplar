require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const SERVER_PORT = process.env.PORT;
const SERVER_API_URL = process.env.API_URL;

app.use(express.json());
app.use(cors());

app.listen(
  SERVER_PORT,
  console.log(`Server has been started at ${SERVER_API_URL}:${SERVER_PORT}`)
);
