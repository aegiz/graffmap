// Tutorial I followed: https://cloud.google.com/nodejs/getting-started/tutorial-app
// ./google-cloud-sdk/bin/gcloud init
// ./google-cloud-sdk/bin/gcloud auth application-default login

// npm install --save @google-cloud/vision

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

var fs = require('fs');
var test = [];
var counter = 1;

fs.readdir("./images", function( err, files ) {
	if(err) {
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	}
	files.forEach( function(file, index ) {
		if(file !== ".DS_Store") {
			if(counter < 200) {
				getDatafFromGoogle(file);
			}
			counter++;
		}
	})
});

function getDatafFromGoogle(name) {
	// Performs label detection on the image file
	client
	  .labelDetection('./images/' + name)
	  .then(results => {
	  	console.log("loaded labels!")
	  	const labels = results[0].labelAnnotations;
	  	var entity = {};
	  	entity["name"] = name;
	  	entity["data"] = [];
	  	labels.forEach(label => entity["data"].push(label.description));
	  	test.push(entity);
	  	fs.appendFile("./test.json", JSON.stringify(test, null, 2));
		fs.rename('./images/' + name , './done/' + name, function(err) {
		   if ( err ) console.log('ERROR: ' + err);
		});
	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	  });
}