// const _ = require('underscore');

module.exports = {
	decideOnAuthor(userName, firstName) {
		var author = "";
		if (userName.indexOf("@") === -1) {
			author = userName;
		} else if (firstName.indexOf("@") === -1) {
			author = firstName;
		} else {
			author = userName.split('@')[0];
		}
		return (author === "") ? "Unknown" : author;
	},
	cleanGraffForFront(graffs) {
		return graffs.map(graff => {
			return {
				"id": graff._id,
				"lng": graff.location.coordinates[0],
				"lat": graff.location.coordinates[1],
				"name": graff.thumbnail.name
			}
		});
	},
	formatDateEurope(oldDate) {
		return (
			oldDate.split('-')[2] +
			'/' +
			oldDate.split('-')[1] +
			'/' +
			oldDate.split('-')[0]
		);
	}
};
