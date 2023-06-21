const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log('It worked! Returned coordinates:', coords);
  });
});



/*Require it in index.js
For now, call the function and pass in our (IPv4) IP address string as the first argument to the function
For now, our callback can simply print out the values for error and data*/