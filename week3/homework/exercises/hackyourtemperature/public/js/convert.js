module.exports = {
  secToHours: function (sec) {
    sec = Math.abs(sec);
    return (sec / 3600).toFixed(1);
  },
  tempKToC: function (k) {
    return k - 273.15;
  },
  tempKToF: function (k) {
    const f = (k - 273.15) * 1.8 + 32;

    return f;
  },
};
