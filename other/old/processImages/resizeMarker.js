const sharp = require('sharp');
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var path = require('path');


fs.readdir("src/8/", function( err, files ) {
	if(err){
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	}
	files.forEach( function(file, index ) {
		if(file.slice(-3) === "jpg" || file.slice(-3) === "png") {
			var round = "pin/" + file.slice(0,-4) + "png";
			gm("./src/8/" + file)
				.gravity('Center')
		   	.crop('344', '480', '^')
		   	.resize('50', '70', '^')
		   	.write(round, function (err) {
		    		if (!err) console.log(' hooray! ');
		    	});
		}
	})
});

