// Will do separate image portrait from the rest of the input in an output folder
// In output you will have to run: 

// exiftool -all= ./output
// exiftool -all= ./input
// Then open all the images of the output folder in the preview tool. Select them all. rotate them all
// Once done merge everything in the folder /final


var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');

var src = "./input/";
var output = "./";

var portraitJSON = [];

// Loop through all the files to list the portrait
fs.readdir(src, function( err, files ) {
	if(err) {
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	}
	files.forEach( function(file, index ) {
		if(file.slice(-3) === "jpg" || file.slice(-3) === "png") {
			// generate thumbnails
			gm(src + file)
				.orientation(function(err, value) {
					console.log('value => ',value + "  " + src + file);
					// Portrait = "RightTop"
					if(value === "RightTop") {
						fs.rename(src + file, './output/' + file,function(err) {
						   if ( err ) console.log('ERROR: ' + err);
						});
					}
				});
		}
	})
})
