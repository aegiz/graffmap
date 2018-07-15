var fs = require('fs');

var dataJSON = require('./Graff-2.json');
var counter = 0;
for (var i = 0; i <= dataJSON.length - 1; i++) {
	counter++;
	var image1 = dataJSON[i].image1 ? dataJSON[i].image1.name.replace(/ /g, "_20")  : "";
	dataJSON[i].thumbnail = {
		"type": "File",
      "name": image1,
      "url": "/thumbnail/" + image1
	}
}
fs.writeFile('./Graff-2.json', JSON.stringify(dataJSON, null, 2));

console.log('counter => ',counter);
console.log('i => ',i);
