require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const knex = require("knex")(require("./knexfile"));

const authorize = require("./utils/authorize");

const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const destinationRoute = require("./routes/destinationRoute");
const siteRoute = require("./routes/siteRoute");
const itineraryRoute = require("./routes/itineraryRoute");
const uploadRoute = require("./routes/uploadRoute");
const postImageRoute = require("./routes/postImageRoute");
const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL;

app.use(express.json());
app.use(cors());

app.use("/", uploadRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/destination", authorize, destinationRoute);
app.use("/site", authorize, siteRoute);
app.use("/itinerary", authorize, itineraryRoute);
app.use("/postimage", authorize, postImageRoute);

app.listen(PORT, console.log(`Server has been started at ${API_URL}:${PORT}`));
