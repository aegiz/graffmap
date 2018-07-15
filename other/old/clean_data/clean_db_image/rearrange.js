// sudo npm install node-uuid

var fs = require('fs');
var uuid = require('node-uuid');

var dataJSON = require('./Graff-2.json');
var counter = 0;
for (var i = 0; i <= dataJSON.length - 1; i++) {
	var thumbnail = dataJSON[i].thumbnail ? dataJSON[i].thumbnail.name : "";
	// Might have to patch _20 with %20
	var image1 = dataJSON[i].image1 ? dataJSON[i].image1.name.replace(/ /g, "_20")  : "";
	var image2 = dataJSON[i].image2 ? dataJSON[i].image2.name.replace(/ /g, "_20")  : "";
	var image3 = dataJSON[i].image3 ? dataJSON[i].image3.name.replace(/ /g, "_20") : "";
	if(image1 !== "") {
		counter++;
		// Move original to /original folder
		var filename = uuid.v4();
		dataJSON[i].image1 = {
			"type": "File",
			"name": filename + ".jpg",
			"url": "/original/" + filename + ".jpg"
		}
		fs.rename('./' + image1, "./original/" + filename + ".jpg", function(err) {
			if(err) {
				console.log(err);
			}
		});
		var filename = uuid.v4();
		dataJSON[i].image2 = {
			"type": "File",
			"name": filename + ".jpg",
			"url": "/original/" + filename + ".jpg"
		}
		if(image2 !== "") {
			fs.rename('./' + image2, "./original/" + filename + ".jpg", function(err) {
				if(err) {
					console.log(err);
				}
			});
		}
		var filename = uuid.v4();
		dataJSON[i].image3 = {
			"type": "File",
			"name": filename + ".jpg",
			"url": "/original/" + filename + ".jpg"
		}
		if(image3 !== "") {
			fs.rename('./' + image3, "./original/" + filename + ".jpg", function(err) {
				if(err) {
					console.log(err);
				}
			});
		}

	// il n'y a que l'image2 
	} else if (image2 !== "") {
		var filename = uuid.v4();
		delete dataJSON[i].image2;
		dataJSON[i].image1 = {
			"type": "File",
			"name": filename + ".jpg",
			"url": "/original/" + filename + ".jpg"
		}
		fs.rename('./' + image2, "./original/" + filename + ".jpg", function(err) {
			if(err) {
				console.log(err);
			}
		});
		if(image3 !== "") {
			var filename = uuid.v4();
			delete dataJSON[i].image3;
			dataJSON[i].image2 = {
				"type": "File",
				"name": filename + ".jpg",
				"url": "/original/" + filename + ".jpg"
			}
			fs.rename('./' + image3, "./original/" + filename + ".jpg", function(err) {
				if(err) {
					console.log(err);
				}
			});
		}
	} else if (image3 !== "") {
		var filename = uuid.v4();
		delete dataJSON[i].image3;
		dataJSON[i].image1 = {
			"type": "File",
			"name": filename + ".jpg",
			"url": "/original/" + filename + ".jpg"
		}
		fs.rename('./' + image3, "./original/" + filename + ".jpg", function(err) {
			if(err) {
				console.log(err);
			}
		});
	// il n'y a aucune original
	} else {
		delete dataJSON[i];
		//console.log('thumbnail => ',thumbnail);
	}
}
fs.writeFile('./Graff-2.json', JSON.stringify(dataJSON, null, 2));

console.log('counter => ',counter);
console.log('i => ',i);
