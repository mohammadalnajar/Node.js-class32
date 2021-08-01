const calcTime = require("./getTime");
const moment = require("moment");
const { secToHours, tempKToC, tempKToF } = require("./convert");

function weatherData(response, cityName) {
  const { main, coord, sys, weather, timezone, wind } = response;

  const { temp, pressure, humidity } = main;
  const { lon, lat } = coord;
  const { country, sunrise, sunset } = sys;
  const { description } = weather[0];
  const { speed } = wind;

  const cTemp = Math.floor(tempKToC(temp));
  const fTemp = Math.floor(tempKToF(temp));

  const offset =
    timezone < 0 ? `-${secToHours(timezone)}` : `+${secToHours(timezone)}`;
  const { date, time } = calcTime(cityName, offset);
  const sunriseTime = moment
    .unix(sunrise)
    .utcOffset(offset * 60)
    .format("HH:mm");
  const sunsetTime = moment
    .unix(sunset)
    .utcOffset(offset * 60)
    .format("HH:mm");

  const iconUrl = require("./getIconUrl")(description);

  return {
    cityName,
    cTemp,
    fTemp,
    country,
    description,
    time,
    date,
    speed,
    humidity,
    pressure,
    sunriseTime,
    sunsetTime,
    iconUrl,
  };
}

module.exports = weatherData;
