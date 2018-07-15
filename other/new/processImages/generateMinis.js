// Will do:
// will create mini in output folder

var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var path = require('path');

var inputPath = "./output/thumbnail";
var outputPath = "./output/mini";

console.log("Starting generating the mini...");

// Loop through all the files in the src directory
fs.readdir(inputPath, function( err, files ) {
	if(err) {
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	}
	files.forEach( function(file, index ) {
		if(file.slice(-3) === "jpg" || file.slice(-3) === "png") {
			// generate mini
			var finalOutput = outputPath + "/" + file;
			gm(inputPath + "/" + file)
				.resize('50', '50', '^')
				.gravity('Center')
  				.crop('50', '50')
				.write(finalOutput, function(err) {
					console.log(err || 'done mini');
				});
		}
	})
})