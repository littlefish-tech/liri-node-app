console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var axios = require("axios");
axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=429247b6").then(
    function(response){
        console.log()
    }
)