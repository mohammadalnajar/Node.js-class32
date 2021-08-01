const express = require("express");
const exphbs = require("express-handlebars");
const fetch = require("node-fetch");
const port = 5566;
const app = express();
const API_KEY = require("./sources/keys.json").API_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // middleware to handle the content-type application/x-www-form-urlencoded
app.use(express.static("public"));

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

// post city name
app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`
  )
    .then((res) => res.json())
    .then((response) => {
      if (response.message) {
        res.status(404).render("index", { error: response.message });
        return;
      }
      const data = require("./public/js/orderingWeatherData")(
        response,
        cityName
      );
      res.status(200).render("weather", { data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).render("error", {
        mgs: "Sorry but there is a technical issue, try later please",
      });
    });
});
app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);
