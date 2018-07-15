// Will do:
// will create thumbnails in output folder

var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var path = require('path');

var inputPath = "./output/original";
var outputPath = "./output/thumbnail";

console.log("Starting generating the thumbs...");

var width = 640;
var height = 480;

// Loop through all the files in the input directory
fs.readdir(inputPath, function( err, files ) {
	if(err) {
		console.error( "Could not list the directory.", err );
		process.exit(1);
	}
	files.forEach( function(file, index ) {
		if(file.slice(-3) === "jpg" || file.slice(-3) === "png") {
			// generate thumbnails
			gm(inputPath + "/" + file)
				.resize(width, height, '^')
				.gravity('Center')
				.crop(width, height)
				.write(outputPath + "/" + file, function(err) {
					console.log(err || 'done thumbnail');
				});
		}
	})
})