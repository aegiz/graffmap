// will do: Encore un clean de l'import.json
// => Vire la propriete date
// => Vire la propiete enable
// => Rajoute un userid associe
// => Si pas de desccription: en rajouter une!
// => Ne pas oublier de sorter le json a la fin

const fs = require('fs');

const importJSON = require("./import.json");
const joinJSON = require("./_Join_user_Graff.json");

// Make new object with a pair owningId/relatedId
let newJoin = {};

for (var i = joinJSON.length - 1; i >= 0; i--) {
	var item = joinJSON[i];
	newJoin[item.owningId] = item.relatedId
}

// cleaning the import.json file
for (var i = importJSON.length - 1; i >= 0; i--) {
	var item = importJSON[i];
	if(newJoin[item.objectId]) {
		item.userId = newJoin[item.objectId];
	} else {
		item.userId = "mRNHRccquC"; // This is the "Unknown user"
	}
	if(typeof(item.description) === "undefined") {
		item.description = "";
	}
	delete item.date;
	delete item.enable;
}

console.log("done")

fs.writeFile("./import2.json", JSON.stringify(importJSON, null, 2));
