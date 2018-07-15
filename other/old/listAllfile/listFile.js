var fs = require('fs');

var output = [];

fs.readdir("./thumbnail", function( err, files ) {
	if(err) {
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	}
	files.forEach( function(file, index ) {
		if(file !== ".DS_Store") {
			output.push(file);
		}
	})
	fs.writeFile("./clean.json", JSON.stringify(output, null, 2));
});


//console.log(Object.keys(cleanObj).length);