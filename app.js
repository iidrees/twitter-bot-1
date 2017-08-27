// import dependencies
let dotenv = require('dotenv').config();

let Twitter = require('twitter');
let config = require('./config.js');

// initialise the twitter app and then connect with the Twitter API
let T = new Twitter(config);

// Set up the tweet search functionality

let params = {
  q: '#nodejs',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

// make get request with the params variable above
T.get('search/tweets', params, (err, data, response) => {
  if (!err) {
    // loop through the returned tweets
    for (let i = 0; i < data.statuses.length; i++) {
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str }
      // try to favourite the selected tweet
      T.post('favorites/create', id, (err, response) => {
        //if the favorite fails, log the err message
        if (err) {
          console.log(err[0].message);
        }
        // If the favorite is successful, log the url of the tweet
        else {
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})
