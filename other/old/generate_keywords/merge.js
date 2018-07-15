var fs = require('fs');

const importJSON = require("./import.json");
const finalJSON = require("./final.json");
//const keys = Object.keys(cleanJSON);

var cleanObj = [];

for (var i = importJSON.length - 1; i >= 0; i--) {
	var name = importJSON[i]["image1"]["name"];
	importJSON[i]["keywords"] = finalJSON[name];
}

fs.writeFile("./importUPDATE.json", JSON.stringify(importJSON, null, 2));

//console.log(Object.keys(cleanObj).length);