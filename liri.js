require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });

var axios = require("axios");

var nodeArgs = process.argv;
// Grab the movieName which will always be the third node argument.
var artist = "";
for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        artist = artist + "+" + nodeArgs[i];
    } else {
        artist += nodeArgs[i];
    }
}
//var artist  = process.argv[2];

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
      for (i = 0; i < response.data.length; i++){
    console.log("Name of the Venue: " + response.data[i].venue.name);
    console.log("Venue location: " + response.data[i].venue.city);
    console.log("Date of the Event: " + response.data[i].datetime);
      }
    //console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status--------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });