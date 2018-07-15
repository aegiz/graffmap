var fs = require('fs');

const testJSON = require("./test.json");

var cleanObj = {};

for (var i = testJSON.length - 1; i >= 0; i--) {
	var array = testJSON[i];
	for (var j = array.length - 1; j >= 0; j--) {
		var name = array[j]["name"];
		var data = array[j]["data"];
		// Making sure that all these keywords are there
		if(!data.includes('graffiti')) {
			data.push("graffiti");
		}
		if(!data.includes('art')) {
			data.push("art");
		}
		if(!data.includes('street art')) {
			data.push("street art");
		}
		cleanObj[name] = data;
	}
}

fs.writeFile("./clean.json", JSON.stringify(cleanObj, null, 2));

//console.log(Object.keys(cleanObj).length);