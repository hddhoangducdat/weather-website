const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGRkaG9hbmdkdWNkYXQiLCJhIjoiY2sxMGZmdjYwMDVjajNubXl0MGZqMG95NiJ9.V75jV4mLMv0ZS0KrnjE-og`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const { center, place_name } = response.body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name
      });
    }
  });
};

module.exports = geocode;
