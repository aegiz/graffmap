// will do: Encore un clean de l'import.json
// => pour toutes les nouvelles photos reassocie le user fracart comme l'auteur

const fs = require('fs');

const importJSON = require("./import.json");
const importNewJSON = require("./import_new.json");

// Make new object with a pair owningId/relatedId
let ids = {};

for (var i = importNewJSON.length - 1; i >= 0; i--) {
	var item = importNewJSON[i];
	ids[item.objectId] = "hop"
}

// cleaning the import.json file
for (var i = importJSON.length - 1; i >= 0; i--) {
	var item = importJSON[i];
	if(ids[item.objectId]) {
		item.userId = "s4V3TQoEqi";
	}
}

console.log("done")

fs.writeFile("./import2.json", JSON.stringify(importJSON, null, 2));
