'use strict';

var graffmap = graffmap || {};

graffmap.map = (function(window, document) {
	var _mapArgs = {
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControl: true,
		mapTypeControl: false,
		scrollwheel: true,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		styles: [
			{
				featureType: 'poi',
				elementType: 'all',
				stylers: [{ visibility: 'off' }]
			},
			{
				featureType: 'all',
				elementType: 'all',
				stylers: [
					{
						hue: '#ffbb00'
					}
				]
			},
			{
				featureType: 'all',
				elementType: 'geometry.fill',
				stylers: [
					{
						hue: '#ffbb00'
					}
				]
			},
			{
				featureType: 'all',
				elementType: 'labels.text.fill',
				stylers: [
					{
						hue: '#ffbb00'
					}
				]
			},
			{
				featureType: 'water',
				elementType: 'all',
				stylers: [
					{
						color: '#fff6c1'
					},
					{
						visibility: 'on'
					}
				]
			}
		]
	};

	function _initSearchCityRightPanel(map) {
		// Clicks on the city item
		$('.cities__item').on('click', function() {
			var chosenCity = $(this).attr('data-city');
			if (chosenCity === 'Paris') {
				centerMapOnSpecificPos(map, {
					lat: 48.8589507,
					lng: 2.2770205
				});
			} else if (chosenCity === 'London') {
				centerMapOnSpecificPos(map, {
					lat: 51.5287718,
					lng: -0.2416804
				});
			} else if (chosenCity === 'Las vegas') {
				centerMapOnSpecificPos(map, {
					lat: 36.1251958,
					lng: -115.3150833
				});
			} else {
				graffmap.loader.recenterOnUser();
			}
		});

		// Create the search box and link it to the UI element.
		var searchBox = new google.maps.places.SearchBox($('#search-city')[0]);

		// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', function() {
			searchBox.setBounds(map.getBounds());
		});

		// Fire when the user selects a search prediction
		searchBox.addListener('places_changed', function() {
			var places = searchBox.getPlaces();
			if (places.length === 0) {
				return;
			}
			var bounds = new google.maps.LatLngBounds();
			places.forEach(function(place) {
				if (!place.geometry) {
					return;
				}
				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			map.fitBounds(bounds);
		});
	}

	function _createMap(lat, lng) {
		// Create map
		_mapArgs.center = new google.maps.LatLng(lat, lng);
		var map = new google.maps.Map($('.graffmap')[0], _mapArgs, lat, lng);

		// Add a markers reference
		map.markers = [];

		google.maps.event.addListener(map, 'bounds_changed', function() {
			$('.bottom-bar').removeClass('bottom-bar--show');
		});

		// Listen for any change on the map and trigger when the map is static again
		google.maps.event.addListener(map, 'idle', function() {
			var args = _getCenterAndMapWidth(map);
			// prettier-ignore
			$.get("/api/graff/close?" +
				"lng=" + args.centerLng + 
				"&lat=" + args.centerLat +
				"&dist=" + args.width, function(graffs) {
				if(graffs && graffs.length !== 0) {
					_updateMapWithNewMarkers(map, graffs)
				}
			});
		});
		return map;
	}
	function _getCenterAndMapWidth(map) {
		var spherical = google.maps.geometry.spherical,
			bounds = map.getBounds(),
			cor1 = bounds.getNorthEast(),
			cor2 = bounds.getSouthWest(),
			cor3 = new google.maps.LatLng(cor2.lat(), cor1.lng()),
			width = spherical.computeDistanceBetween(cor1, cor3);
		return {
			width: width,
			centerLng: map.getCenter().lng(),
			centerLat: map.getCenter().lat()
		};
	}

	// Only keep the new marker
	function _filterMarkers(map, graffs) {
		var markerAlreadyOnMap = _.map(map.markers, function(val) {
			return {
				_id: val._id,
				lng: val.position.lng(),
				lat: val.position.lat(),
				icon: val.icon,
				name: val.name
			};
		});
		// markerInWindow => all the graff around (including the one already on the map)
		var markerInWindow = _.map(graffs, function(val) {
			var name = val.thumbnail.name.slice(0, -4);
			return {
				_id: val._id,
				lng: val.location.coordinates[0],
				lat: val.location.coordinates[1],
				icon: '/img/graffs/pin/' + name + '.png',
				name: name
			};
		});

		return _.filter(markerInWindow, function(obj) {
			return !_.findWhere(markerAlreadyOnMap, { _id: obj._id });
		});
	}
	function _updateMapWithNewMarkers(map, graffs) {
		var filteredMarkers = _filterMarkers(map, graffs);
		_.map(filteredMarkers, function(item) {
			var latlng = new google.maps.LatLng(item.lat, item.lng);
			var marker = new google.maps.Marker({
				_id: item._id,
				position: latlng,
				icon: item.icon,
				name: item.name
			});
			map.markers.push(marker);
			// show info window when marker is clicked
			google.maps.event.addListener(marker, 'click', function() {
				graffmap.pannelrightpopin.openGraff(this._id);
			});
			// Add the marker to the map;
			marker.setMap(map);
		});
	}

	var centerMapOnSpecificPos = function(map, userCoords) {
		var latlng = new google.maps.LatLng(userCoords.lat, userCoords.lng);
		map.panTo(latlng);
	};

	var retrieveMarkersInView = function(map) {
		if (typeof map === 'undefined') {
			return;
		}
		var allMarkers = map.markers;
		var markersInView = {};
		for (var i = 0; i < allMarkers.length; i++) {
			if (map.getBounds().contains(allMarkers[i].getPosition())) {
				markersInView[allMarkers[i]._id] = allMarkers[i];
			}
		}
		return markersInView;
	};

	function init(lat, lng) {
		var mapCreated = _createMap(lat, lng);
		_initSearchCityRightPanel(mapCreated);
		return mapCreated;
	}

	return {
		init: init,
		retrieveMarkersInView: retrieveMarkersInView,
		centerMapOnSpecificPos: centerMapOnSpecificPos
	};
})(window, document);
