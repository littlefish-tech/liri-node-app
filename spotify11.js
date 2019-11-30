const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
console.log(result.parsed)

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });