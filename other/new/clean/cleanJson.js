// Will do: Clean the out.json:
var fs = require('fs');

var dataJSON = require('../output/out.json');

console.log("Starting cleaning the Json file...");

function stringGen(len){
	var text = "";
	var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
	for( var i=0; i < len; i++ ) {
		text += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return text;
}

function parseStringToISODate(s) {
	var b = s.split(/\D/);
	var d = new Date(b[0], --b[1], b[2], b[3], b[4], b[5]);
	return d && d.getMonth() == b[1] && d.getHours() == b[3] &&
	d.getMinutes() == b[4]? d : new Date(NaN);
}

for (var i = dataJSON.length - 1; i >= 0; i--) {
	var item = dataJSON[i];
	item.count_like = 0;
	item.count_report = 0;
	item.description = "";
	if(typeof(item.GPSLatitude) !== "undefined" && typeof(item.GPSLongitude) !== "undefined") {
		item.location = {
			"type": "Point",
			"coordinates": [item.GPSLongitude.val, item.GPSLatitude.val]
		};
	} else {
		console.log("NO GEOPOINT!! TO BE CORRECTED");
		item.location = {
			"type": "Point",
			"coordinates": ["todo_geo NAME: " + item.SourceFile, "todo_geo NAME: " + item.SourceFile]
		};
	}
	item.objectId = stringGen(10);
	item.thumbnail = {
		"type": "File",
		"name": item.image1.name,
		"url": "/thumbnail/" + item.image1.name
	}

	var oldISODate = item.DateTimeOriginal.val;
	var newISODate = parseStringToISODate(oldISODate)

	item.createdAt = newISODate;
	item.updatedAt = newISODate;
	item.userId = "s4V3TQoEqi"; // For the new pictures put the 'fracart' userId

	if(!item.keywords) {
		item.keywords = ["graffiti", "art", "street art"];
	}

	delete item.SourceFile;
	delete item.name;
	delete item.gpslatitude;
	delete item.gpslongitude;
	delete item.Orientation;
	delete item.FileName;
	delete item.GPSLatitude;
	delete item.GPSLongitude;
	delete item.DateTimeOriginal;
}


fs.writeFile('./output/out.json', JSON.stringify(dataJSON, null, 2));