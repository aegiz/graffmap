// will do a new big clean of import
// virer les images 2 et 3 quand il n'y a pas de miniature DONE
// remove the: date
// remove the: enable
// créer une nouvelle propriété userID a partir de join, si pas de correspondance renvoyer l'id du user unknown

const fs = require('fs');

const importJSON = require("./import.json");
const GraffJSON = require("./Graff.json");
const joinJSON = require("./_Join_user_Graff.json");

let newJson = {};

// make new array containing an the id of the graff and booleans with image1 2 3
for (var i = GraffJSON.length - 1; i >= 0; i--) {
	var item = GraffJSON[i];
	var values = {};
	values.image1 = item.image1 ? true : false;
	values.image2 = item.image2 ? true : false;
	values.image3 = item.image3 ? true : false;
	newJson[item.objectId] = values;
}


// Make new object with a pair owningId/relatedId
let newJoin = {};

for (var i = joinJSON.length - 1; i >= 0; i--) {
	var item = joinJSON[i];
	newJoin[item.owningId] = item.relatedId
}

// cleaning the import.json file
for (var i = importJSON.length - 1; i >= 0; i--) {
	var item = importJSON[i];
	// if no image2 in the original graff.json file
	if(!newJson[item.objectId]["image2"]) {
		delete item.image2;
	}
	// if no image3 in the original graff.json file
	if(!newJson[item.objectId]["image3"]) {
		delete item.image3;
	}
	if(newJoin[item.objectId]) {
		item.userId = newJoin[item.objectId];
	} else {
		item.userId = "mRNHRccquC"; // This is the "Unknown user"
	}
	delete item.date;
	delete item.enable;
}

console.log("done")

fs.writeFile("./import2.json", JSON.stringify(importJSON, null, 2));
