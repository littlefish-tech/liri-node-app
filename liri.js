require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var axios = require("axios");
var nodeArgs = process.argv;
var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this":
    concert();
    break;

    case "spotify-this-song":
      spotifySong();
      break;

    case "movie-this":
      movie();
      break;

    case "do-what-it-says":
      others();
      break;
}

// Grab the movieName which will always be the third node argument.
function concert() {

var artist = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
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
    console.log("********************START FROM HERE***************************")
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
}

function movie(){

var movie = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movie = movie + "+" + nodeArgs[i];
    } else {
      movie += nodeArgs[i];
    }
}

  // We then run the request with axios module on a URL with a JSON
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
      // Then we print out the imdbRating
      console.log("********************START FROM HERE***************************")
      console.log("Title of the movie: " + response.data.Title);
      console.log("Year the movie came out: " + response.data.Year);
      console.log("IMDB Rating of the movie: " + response.data.imdbRating);
      //console.log("Rotten Tomatoes Rating of the movie: " + response.data.Country);
      console.log("Country where the movie was produced: " + response.data.Country);
      console.log("Language of the movie: " + response.data.Language);
      console.log("Plot of the movie: " + response.data.Plot);
      console.log("Actors in the movie: " + response.data.Actors);
      //console.log(response);
    }
  );
  }

  function others() {

  
  var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

});
  }


  function spotifySong() {
  
  var spotify = new Spotify(keys.spotify);

  var song = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      song = song + "+" + nodeArgs[i];
    } else {
      song += nodeArgs[i];
    }
}
var songName = nodeArgs.slice(3).join(' ');

//   const result = dotenv.config()
 
// if (result.error) {
//   throw result.error
// }
 
// console.log(result.parsed)

spotify.search({ type: "track", query: song}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   //console.log(data.tracks.items);
  var songInfo = data.tracks.items
  for (i = 0; i < songInfo.length; i++){
    
  //console.log(songInfo[i]); 

  console.log("********************START FROM HERE***************************")
  console.log("Artist(s): " + songInfo[i].artists[0].name);
  
  console.log("The song's name: " + songName)
  console.log("A preview link of the song from Spotify: " + songInfo[i].preview_url)
  console.log("The album that the song is from: " + songInfo[i].album.name)
  //console.log("********************END FROM HERE***************************")
}  
} 
  // });
)}