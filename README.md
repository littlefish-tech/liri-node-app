# liri-node-app


### This is so far one of my favorite project. I am practising Javascript and I am alway can see how Javascript is running at the backend. When I see the result I am looking for running in the console, I feel very excited. The process to find problem, thinking about fixing the problem and finally fixed the problem is really fun.

### Below is the steps about how I finish this project.
- I created my own spotify account to have my own spotify ID and secrets
- I put my own spotify ID and secrets in a sepreate file called .env
- I have also created a file called .gitignore, and I add some files' names in that then, then the public will not see the content in those files
- I created 4 actions and put them under switch method, the 4 actions are:
    1. concert-this
    2. spotify-this-song
    3. movie-this
    4. do-what-it-says

- The concert-this is easiler, since I just need to search the value use the URL link and and get the values that I need.
``` javascript
function concert() {

var value = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      value = value + "+" + nodeArgs[i];
    } else {
      value += nodeArgs[i];
    }
}

var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
      for (i = 0; i < response.data.length; i++){
    console.log("********************START FROM HERE***************************" + "\n")
    console.log("Name of the Venue: " + response.data[i].venue.name + "\n");
    console.log("Venue location: " + response.data[i].venue.city + "\n");
    console.log("Date of the Event: " + response.data[i].datetime + "\n");
      }
    //console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
     
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status--------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
 
      console.log(error.request);
    } else {
     
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

```
- spotify-this-song is kind of challenger, I need to make sure that I will install the npm spotify package, and have my spotify ID and secret ready, and make sure the files "keys.js, .env, and liri.js" are linked together, then I will be able to get the values that I look for.

``` javascript
function spotifySong() {
  
  

  var value = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      value = value + "+" + nodeArgs[i];
    } else {
      value += nodeArgs[i];
    }
}
var songName = nodeArgs.slice(3).join(' ');



spotify.search({ type: "track", query: value}, function(err, data) {
 
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
  var songInfo = data.tracks.items
  for (i = 0; i < songInfo.length; i++){
    
  console.log("********************START FROM HERE***************************" + "\n")
  console.log("Artist(s): " + songInfo[i].artists[0].name + "\n");
  
  console.log("The song's name: " + songName + "\n")
  console.log("A preview link of the song from Spotify: " + songInfo[i].preview_url + "\n")
  console.log("The album that the song is from: " + songInfo[i].album.name + "\n")
  //console.log("********************END FROM HERE***************************")
}  
} 

)}

```
- MOvie-this is a very fun part, and we can search a movie's detail information by typing the command and the movie's name. If the user not type anything, then it will show the default movie detail "Mr, Nobody" in the terminal.

``` javascript

function movieShow(){

let value = "Mr. Nobody";


for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    value = "" + "+" + nodeArgs[i];
  }else {
    value = "" + nodeArgs[i];
    }
    
}

  axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
      console.log("********************START FROM HERE***************************" + "\n")
      console.log("Title of the movie: " + response.data.Title + "\n");
      console.log("Year the movie came out: " + response.data.Year + "\n");
      console.log("IMDB Rating of the movie: " + response.data.imdbRating + "\n");
      console.log("Rotten Tomatoes Rating of the movie: " + JSON.stringify(response.data.Ratings[1].Value) + "\n");
      console.log("Country where the movie was produced: " + response.data.Country + "\n");
      console.log("Language of the movie: " + response.data.Language + "\n");
      console.log("Plot of the movie: " + response.data.Plot + "\n");
      console.log("Actors in the movie: " + response.data.Actors + "\n");
      //console.log(response);
    }
  );
  }

```
- The last command do-what-it-says. It is a little bit challenge. We need to use node file system to read the file "random.txt". It will look for the first element in the file, and it is the command, the the terminal need to run that command as well, the way it runs is the same as how we define those command. The search value is the second element in the file. One part we need to be aware is the second element usually have a quote, and we need to think about how to remove the quote when searching them as the value. Below are the methods I use to get the value only.
    - JavaScript String split() method
    - JavaScript String splice() method
    - JavaScript Array join() method

``` javascript
function others() {

  var fs = require("fs");

fs.readFile("random.txt", "utf8", function(error, data) {

 
  if (error) {
    return console.log(error);
  }

 
  console.log(data);

  var dataArr = data.split(",");


  console.log(dataArr);


  action = dataArr[0];
  value = process.argv[3] = dataArr[1].split("").slice(1,-1).join('');


  switch (action) {
    case "concert-this":
      concert();
      break;
  
      case "spotify-this-song":
        spotifySong();
        break;
  
      case "movie-this":
        movieShow();
        break;
  
      case "do-what-it-says":
        others();
        break;
  }

});

  }



```

## below are some gifs about how the information is showing in the Terminal

### Concer-this
![concert-this](./gifs/concert-this.gif)

### spotify-this-song
![spotify-this-song](./gifs/spotify-this-song.gif)

### movie-this
![movie-this](./gifs/movie-this.gif)

### do-what-it-says
![do-what-it-says](./gifs/do-what-it-says.gif)