const request = require('request');


/* fetchIP take CB as arguement
CB will be called only when IP is fetched */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

  });
};

module.exports = { fetchMyIP };
