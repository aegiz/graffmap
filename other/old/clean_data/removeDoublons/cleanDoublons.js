// will remove the image2 and image3 of the import.json based on what is in the /mini folder

const fs = require('fs');

const importJSON = require("./import.json");
var src = "./mini/";

let existingImg = {};


// Loop through all the files in the src directory
fs.readdir(src, function( err, files ) {
	if(err) {
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	}
	files.forEach( function(file, index ) {
		var name = file.slice(0, -4);
		existingImg[name] = true;
	});
	// cleaning the import.json file
	for (var i = importJSON.length - 1; i >= 0; i--) {
		var item = importJSON[i];
		if(typeof(item.image1) !== "undefined") {
			var nameImage1 = item.image1.name.slice(0, -4);
			if(!existingImg[nameImage1]) {
				delete item.image1;
			}
		}

		if(typeof(item.image2) !== "undefined") {
			var nameImage2 = item.image2.name.slice(0, -4);
			if(!existingImg[nameImage2]) {
				delete item.image2;
			}
		}

		if(typeof(item.image3) !== "undefined") {
			var nameImage3 = item.image3.name.slice(0, -4);
			if(!existingImg[nameImage3]) {
				delete item.image3;
			}
		}
	}
	fs.writeFile("./clean_import.json", JSON.stringify(importJSON, null, 2));
})




