var fs = require('fs');

const cleanJSON = require("./clean.json");
const listJSON = require("./listfile.json");
const keys = Object.keys(cleanJSON);

var cleanObj = [];

for (var i = listJSON.length - 1; i >= 0; i--) {
	if(!cleanJSON[listJSON[i]]) {
		cleanObj.push(listJSON[i]);
	}
}

fs.writeFile("./misingKeys.json", JSON.stringify(cleanObj, null, 2));

//console.log(Object.keys(cleanObj).length);