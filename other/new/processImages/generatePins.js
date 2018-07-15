const sharp = require('sharp');
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var path = require('path');

var inputPath = "./output/thumbnail";
var outputPath = "./output/pin";

console.log("Starting generating the pin...");

const roundedCorners = new Buffer(
  '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="343.216px" height="480px" viewBox="87.031 89.816 343.216 480" enable-background="new 87.031 89.816 343.216 480"	 xml:space="preserve"><g>	<path fill="#010002" d="M258.639,89.816c-94.638,0-171.607,77.067-171.607,171.74c0,88.927,128.447,185.157,165.588,303.964		c0.799,2.562,3.19,4.312,5.877,4.296c2.699-0.04,5.054-1.807,5.818-4.391c36.024-121.731,165.923-214.839,165.932-303.887		C430.238,166.884,353.256,89.816,258.639,89.816z"/></g></svg>'
);

fs.readdir(inputPath, function(err, files) {
	if(err) {
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	}
	files.forEach(function(file, index) {
		if(file.slice(-3) === "jpg" || file.slice(-3) === "png") {
			var round = outputPath + '/' + file.slice(0,-3) + "png";
			sharp(inputPath + '/' +  file)
		   	.overlayWith(roundedCorners, { cutout: true })
		   	.toFile(round);
		}
	})
});

