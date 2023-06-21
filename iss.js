const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const errorMessage = `Unexpected status code: ${response.statusCode}`;
      callback(errorMessage, null);
      return;
    }

    try {
      const data = JSON.parse(body);
      const ipAddress = data.ip;
      callback(null, ipAddress);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const apiUrl = `https://freegeoip.app/json/${ip}`;

  request(apiUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const errorMessage = `Unexpected status code: ${response.statusCode}`;
      callback(errorMessage, null);
      return;
    }

    try {
      const data = JSON.parse(body);
      const latitude = data.latitude;
      const longitude = data.longitude;
      callback(null, { latitude, longitude });
    } catch (parseError) {
      callback(parseError, null);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
