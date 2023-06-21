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
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
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
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
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
      const flyOverTimes = data.response;
      callback(null, flyOverTimes);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};

// LightHouse Version bellow

// const request = require('request');
// const fetchMyIP = function(callback) {
//   request('https://api.ipify.org?format=json', (error, response, body) => {
//     if (error) return callback(error, null);

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
//       return;
//     }

//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };
// const fetchCoordsByIP = function(ip, callback) {
//   request(`http://ipwho.is/${ip}`, (error, response, body) => {

//     if (error) {
//       callback(error, null);
//       return;
//     }

//     const parsedBody = JSON.parse(body);

//     if (!parsedBody.success) {
//       const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
//       callback(Error(message), null);
//       return;
//     }

//     const { latitude, longitude } = parsedBody;

//     callback(null, {latitude, longitude});
//   });
// };
// const fetchISSFlyOverTimes = function(coords, callback) {
//   const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

//   request(url, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
//       return;
//     }

//     const passes = JSON.parse(body).response;
//     callback(null, passes);
//   });
// };
// const nextISSTimesForMyLocation = function(callback) {
//   fetchMyIP((error, ip) => {
//     if (error) {
//       return callback(error, null);
//     }

//     fetchCoordsByIP(ip, (error, loc) => {
//       if (error) {
//         return callback(error, null);
//       }

//       fetchISSFlyOverTimes(loc, (error, nextPasses) => {
//         if (error) {
//           return callback(error, null);
//         }

//         callback(null, nextPasses);
//       });
//     });
//   });
// };