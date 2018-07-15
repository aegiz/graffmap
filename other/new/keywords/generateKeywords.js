// Tutorial to follow to install Google cloud API: https://cloud.google.com/nodejs/getting-started/tutorial-app
// Important commands
// ./google-cloud-sdk/bin/gcloud init
// ./google-cloud-sdk/bin/gcloud auth application-default login
// npm install --save @google-cloud/vision

var fs = require('fs');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

var inputPath = "./output/thumbnail";
var outputPath = "./output/out.json";

console.log("Starting generating keywords...");

var dataJSON = require('../output/out.json');
var finalJson = [];

for (var i = dataJSON.length - 1; i >= 0; i--) {
	var item = dataJSON[i];
	getDatafFromGoogle(item);
}

function getDatafFromGoogle(item) {
	// Performs label detection on the image file
	client
	  .labelDetection(inputPath + '/' + item.name + ".jpg")
	  .then(results => {
			const labels = results[0].labelAnnotations;
			console.log("loaded labels!");
			item["keywords"] = [];
			labels.forEach(label => item["keywords"].push(label.description));
			// Adding at least 3 labels: graffiti, art, street art
			if(!item["keywords"].includes('graffiti')) {
				item["keywords"].push("graffiti");
			}
			if(!item["keywords"].includes('art')) {
				item["keywords"].push("art");
			}
			if(!item["keywords"].includes('street art')) {
				item["keywords"].push("street art");
			}
			finalJson.push(item);
			fs.writeFile(outputPath, JSON.stringify(finalJson, null, 2));
		})
		.catch(err => {
			console.error('ERROR:', err);
		});
}