//Global variables
var keys = require("./keys.js");
var input1 = process.argv[2];
var input2 = process.argv[3];

//Twitter variables
var Twitter = require('twitter');
var client = new Twitter(keys);

//Spotify variables
var Spotify = require('node-spotify-api');
var spotify = new Spotify ({
  id: 'e5608b2271914a26b01e3a7c261b38a9',
  secret: '9e1f4d4cfdc3485c93bdb941527a84e6',
});

//OMDB variables for movies
var request = require("request");

//fs variables
var fs = require('fs');

/////////////////////////////////////////////////////////////////////////////////////////
function run() {
	if (input1 == "my-tweets") {
		myTweets();
	}
	if (input1 == "spotify-this-song") {
		spotifyThis();
	}
	if (input1 == "movie-this") {
		movieThis();
	}
	if (input1 == "do-what-it-says") {
		doThis();
	}
}
run();

//FUNCTIONS////////////////////////////////////////////////////////////////////////////
function myTweets() {

	var params = {screen_name: 'lifesMovingUp'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    		for (var i = 0; i < tweets.length; i++) {
    			console.log("");
    			console.log("----------------------------------->");
    			console.log((i+1) + ": " + " " + tweets[i].text);
    			console.log("*Created: " + tweets[i].created_at);
    		}
  		} else {
  			console.log("Error occurred");
  		}
	});
};
////////////////////////////////

function spotifyThis() {

	if (!input2) {
		input2 = "The Sign Ace of Base"
	}

	spotify.search({ type: 'track', query: input2 }, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}

	  	console.log("");
	  	console.log("Your song information: ")
	  	console.log("-------------------------------------------");
	  	//artist
	  	console.log("*Artist: " + data.tracks.items[0].artists[0].name);
	  	console.log("");

	  	//song name
	  	console.log("*Song Name: " + data.tracks.items[0].name);
	  	console.log("");

	  	//preview link of the song on Spotify
	  	console.log("*Link to Song: " + data.tracks.items[0].preview_url);
	  	console.log("");

	  	//album
	  	console.log("*Album: " + data.tracks.items[0].album.name);
	  	console.log("-------------------------------------------");
	  	console.log("");
	 	
	});
};
///////////////////////////////

function movieThis() {

	if (!input2) {
		input2 = "Mr Nobody"
	}

	request("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy", function (error, response, body) {
	
	  if (!error) {
	  	var myObj = JSON.parse(body);
	  	console.log("");
	  	console.log("-------------------------------------------");
	  	console.log("*Movie Title: " + myObj.Title);
	  	console.log("");
	  	console.log("*Year of Release: " + myObj.Year);
	  	console.log("");
	  	console.log("*IMDB rating: " + myObj.imdbRating);
	  	console.log("");
	  	console.log("*Rotten Tomatoes Rating: " + myObj.tomatoRating);
	  	console.log("");
	  	console.log("*Country of Origin: " + myObj.Country);
	  	console.log("");
	  	console.log("*Language: " + myObj.Language);
	  	console.log("");
	  	console.log("*Plot: " + myObj.Plot);
	  	console.log("");
	  	console.log("*Actors: " + myObj.Actors);
	  	console.log("-------------------------------------------");
	  	console.log("");
	  }
	  else {
	  	console.log("error:", error); // Print the error if one occurred
	  }

	});
};
///////////////////////////////

function doThis() {
	fs.readFile("random.txt", 'utf8', function(err, data){

		if (err) {
			console.log(err);
		} 
		else	{
			var dataSplit = data.split(",");

			if (dataSplit[0] === "spotify-this-song") {
				input2 = dataSplit[1];
				spotifyThis();
			}
		}
	})
};
