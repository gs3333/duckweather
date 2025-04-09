const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const API_KEY = "af3d5952e053abe0e96e57e7c87328df"; // Replace with yours

app.post("/", async (req, res) => {
  const city = "Duck";
  const state = "NC"; // Optional, but helps clarify location

  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: `${city},${state},US`,
        units: "imperial",
        appid: API_KEY,
      },
    });

    const weather = response.data;
    const desc = weather.weather[0].description;
    const temp = weather.main.temp;

    res.json({
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [
                `Right now in Duck, NC it's ${temp}°F with ${desc}.`
              ]
            }
          }
        ]
      }
    });
  } catch (error) {
    console.error("Weather error:", error.message);
    res.json({
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [`Sorry, I couldn’t get the weather for Duck, NC.`]
            }
          }
        ]
      }
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🦆 Weather webhook live on port ${PORT}`));
