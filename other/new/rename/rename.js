var fs = require('fs');
var dataJSON = require('../temp.json');

console.log("Starting renaming...");

for (var i = dataJSON.length - 1; i >= 0; i--) {
	if(dataJSON[i].FileName.val.slice(-3) === "jpg" || file.slice(-3) === "png") {
		if(typeof(dataJSON[i].GPSLatitude) !== "undefined" && typeof(dataJSON[i].GPSLongitude) !== "undefined") {
			fs.rename('./input/img/' + dataJSON[i].FileName.val, './input/img/' + dataJSON[i].GPSLatitude.val + ', ' + dataJSON[i].GPSLongitude.val + ".jpg", function(err) {
			   if ( err ) console.log('ERROR: ' + err);
			});
		} else {
			console.log("no coordinates define for:" + dataJSON[i].FileName.val);
		}
	}
}