const request = require('request');


/* fetchIP take CB as arguement
CB will be called only when IP is fetched */
const fetchMyIP = function(callback) {
  /*This API provides the user's IP address in JSON format.*/
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    /* we create an error message
     with the status code and pass it to the callback function. */
    if (response.statusCode !== 200) {
      const errorMessage = `Unexpected status code: ${response.statusCode}`;
      callback(errorMessage, null);
      return;
    }

  });
};

module.exports = { fetchMyIP };
