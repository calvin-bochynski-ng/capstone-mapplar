require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const axios = require("axios");
const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL;

const format = {
  intinerary: {
    description: "Here's a intinerary for (destination), for (number) of days",
    days: [
      {
        description: "Description of the day in which borough",
        morning: "Morning description on places to visit in detail",
        afternoon: "Afternoon description on places to visit in detail",
        evening: "Evening description on places to visit in detail",
      },
    ],
  },
};

router.get("/", async (req, res) => {
  try {
    const itineraries = await knex("itinerary").where({
      user_id: req.body.main_usr_id,
    });
    res.json(itineraries);
  } catch (error) {
    res.status(400).send(`Error retrieving itinerary: ${error}`);
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  const prompt = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant finding the best intinerary for users after they selected the sites they want to visit.`,
      },
      {
        role: "user",
        content: `Give me an itinerary for ${req.body.days} days within ${
          req.body.city
        }, these are the places I want to visit: ${
          req.body.site
        }, give me a rough plan between borough. I want it as a JSON format, see example ${JSON.stringify(
          format
        )}}}`,
      },
    ],
  };

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    prompt,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_SECRET}`,
      },
    }
  );

  const openAiContent = response.data.choices[0].message.content;

  const selectedDestination = await knex("destination")
    .where({
      city: req.body.city,
    })
    .first();

  const newItinerary = {
    user_id: req.body.main_usr_id,
    destination_id: selectedDestination.id,
    pdf_link: `${API_URL}:${PORT}/public/itinerary`,
    itinerary_description: openAiContent,
  };

  try {
    await knex("itinerary").insert(newItinerary);
    return res.status(201).json(newItinerary);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to add Itinerary" });
  }
});

module.exports = router;
