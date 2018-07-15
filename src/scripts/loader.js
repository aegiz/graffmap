'use strict';

var graffmap = graffmap || {};

graffmap.loader = (function(window, document) {
	function _loadMapFromLocalStorage(dataStorageGPS, cb) {
		var currentpos = JSON.parse(dataStorageGPS);
		cb(graffmap.map.init(currentpos.latitude, currentpos.longitude));
	}

	function _loadMapFromCurrentPos(cb) {
		// Try to use the navigator geoloc module first
		navigator.geolocation.getCurrentPosition(
			function(pos) {
				localStorage.currentpos = JSON.stringify({
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude
				});
				cb(graffmap.map.init(pos.coords.latitude, pos.coords.longitude));
			},
			function(error) {
				// If errors localise the user based on his IP
				$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
					localStorage.currentpos = JSON.stringify({
						latitude: data.latitude,
						longitude: data.longitude
					});
					cb(graffmap.map.init(data.latitude, data.longitude));
				});
			},
			{ timeout: 5000 }
		);
	}

	function recenterOnUser(renderedMap) {
		// Try to use the navigator geoloc module first
		navigator.geolocation.getCurrentPosition(
			function(pos) {
				localStorage.currentpos = JSON.stringify({
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude
				});
				graffmap.map.centerMapOnSpecificPos(renderedMap, {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				});
			},
			function(error) {
				// If errors localise the user based on his IP
				$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
					localStorage.currentpos = JSON.stringify({
						latitude: data.latitude,
						longitude: data.longitude
					});
					graffmap.map.centerMapOnSpecificPos(renderedMap, {
						lat: data.latitude,
						lng: data.longitude
					});
				});
			},
			{ timeout: 5000 }
		);
	}

	function _centerMapOnUser(cb) {
		var dataStorageGPS = localStorage.getItem('currentpos');
		if (
			typeof dataStorageGPS !== 'undefined' &&
			graffmap.helpers.parseJSON(dataStorageGPS) !== null
		) {
			_loadMapFromLocalStorage(dataStorageGPS, cb);
		} else {
			_loadMapFromCurrentPos(cb);
		}
	}

	function _centerMapOnGraff(cb) {
		var markers = $('.graffmap').find('.marker');
		cb(
			graffmap.map.init(
				$(markers[0]).attr('data-lat'),
				$(markers[0]).attr('data-lng')
			)
		);
	}

	function init(centerMapOnGraff, cb) {
		if (centerMapOnGraff) {
			_centerMapOnGraff(cb);
		} else {
			_centerMapOnUser(cb);
		}
	}

	return {
		init: init,
		recenterOnUser: recenterOnUser
	};
})(window, document);
