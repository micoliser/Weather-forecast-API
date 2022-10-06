const express = require("express");
const https = require("node:https")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let city = req.body.city.toLowerCase();
  let userUnit = req.body.unit.toLowerCase();

  if (userUnit === "celcius") unit = "metric";
  else if (userUnit === "fahrenheit") unit = "imperial";

  const id = proccess.env.APP_ID;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + id + "&units=" + unit;
  https.get(url, (r) => {
    console.log(r.statusCode);

    r.on("data", (data) => {
      weatherData = JSON.parse(data);

      let temp = weatherData.main.temp;
      let des = weatherData.weather[0].description;
      let icon = weatherData.weather[0].icon;
      let imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temperature in " + city + " is " + temp + "degrees " + userUnit + "</h1>");
      res.write("<h3>The Weather description is " + des + ".</h3>");
      res.write("<img src = " + imageURL + " alt = 'weather image' >")
      res.send();
    });
  });
})

app.listen(3000, () => {
  console.log("Sever started on port 3000");
});
