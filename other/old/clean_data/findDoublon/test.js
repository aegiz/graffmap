// Will do
// Find doublons in image folders

var fs = require('fs');
var path = require('path');

var src1 = "./mini";
var src2 = "./pin";


fs.readdir(src1, function( err, files ) {
	if(err) {
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	}
	var file1 = {};
	var file2 = {};
	files.forEach( function(file, index ) {
		file1[file.slice(0, -3)] = true;
	})
	
	fs.readdir(src2, function( err, files ) {
		files.forEach( function(file, index ) {
			if(!file1[file.slice(0, -3)]) {
				console.log('file => ',file);
			}
		})
	})
})

