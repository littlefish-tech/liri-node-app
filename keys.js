console.log('this is loaded');

var spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
module.export = {spotify};
