const vision = require('@google-cloud/vision');
const missingList = require("./misingKeys.json");

// Creates a client
const client = new vision.ImageAnnotatorClient();

var fs = require('fs');
var test = [];

for (var i = missingList.length - 1; i >= 0; i--) {
	getDatafFromGoogle(missingList[i]);
}

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
	  	if(!entity["data"].includes('graffiti')) {
			entity["data"].push("graffiti");
		}
		if(!entity["data"].includes('art')) {
			entity["data"].push("art");
		}
		if(!entity["data"].includes('street art')) {
			entity["data"].push("street art");
		}
	  	test.push(entity);
	  	fs.writeFile("./missing.json", JSON.stringify(test, null, 2));
	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	  });
}