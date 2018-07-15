// Will do:
// rename the input images with uuid
// generate an out.json file
// will move all the images to the original folder

var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var path = require('path');
var uuid = require('uuid/v4');

var inputPath = "./input";
var outputPath = "./output";

console.log("Starting generating the original...");

var dataJSON = require('../output/out.json');

for (var i = dataJSON.length - 1; i >= 0; i--) {
	var item = dataJSON[i];
	// rename
	var filename = uuid();
	item["image1"] =  {
		"type": "File",
		"name": filename + ".jpg",
		"url": "/original/" + filename + ".jpg"
	};
	item["name"] = filename;
	// move
	var cleanSrcFile = item["SourceFile"].slice(8);
	item.SourceFile = cleanSrcFile;

	fs.rename(inputPath + "/" + cleanSrcFile, outputPath + "/original/" + filename + ".jpg" ,function(err) {
		if(err) {
			console.log(err);
		}
	});
}

fs.writeFile('./output/out.json', JSON.stringify(dataJSON, null, 2));
