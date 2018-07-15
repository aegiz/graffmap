const sharp = require('sharp');
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var path = require('path');

var inputPath = "./output/pin";
var outputPath = "./output/pin";

console.log("Starting resizing the pins...");

fs.readdir(inputPath, function( err, files ) {
	if(err){
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	}
	files.forEach( function(file, index ) {
		if(file.slice(-3) === "jpg" || file.slice(-3) === "png") {
			var round = outputPath + "/" + file.slice(0,-4) + ".png";
			gm(inputPath + "/" + file)
				.gravity('Center')
		   	.crop('344', '480', '^')
		   	.resize('50', '70', '^')
		   	.write(round, function () {});
		}
	})
});

