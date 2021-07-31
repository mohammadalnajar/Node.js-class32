function calcTime(city, offset) {
  // create Date object for current location
  const date = new Date();

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  const newDate = new Date(utc + 3600000 * offset);

  // return time as a string
  return {
    city,
    date: newDate.toDateString(),
    time: newDate.toLocaleTimeString(),
  };
}
module.exports = calcTime;

// resource: https://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/
