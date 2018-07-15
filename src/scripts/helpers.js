'use strict';

var graffmap = graffmap || {};

graffmap.helpers = (function(window, document) {
	function checkImage(imageSrc, good, bad) {
		var img = new Image();
		img.onload = good;
		img.onerror = bad;
		img.src = imageSrc;
	}

	function parseJSON(jsonToTest) {
		try {
			return JSON.parse(jsonToTest);
		} catch (ex) {
			return null;
		}
	}

	function formatDateEurope(oldDate) {
		return (
			oldDate.split('-')[2] +
			'/' +
			oldDate.split('-')[1] +
			'/' +
			oldDate.split('-')[0]
		);
	}

	return {
		checkImage: checkImage,
		formatDateEurope: formatDateEurope,
		parseJSON: parseJSON
	};
})(window, document);
