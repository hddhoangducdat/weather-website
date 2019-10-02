const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/3defe9310da1a5cadead77f16abab698/${latitude},${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unavle to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      const { temperature, precipProbability } = response.body.currently;
      const { summary } = response.body.daily.data[0];
      callback(
        undefined,
        summary +
          'It is currently ' +
          temperature +
          ' degrees out . There is a ' +
          precipProbability +
          '% chance of rain'
      );
    }
  });
};

module.exports = forecast;
