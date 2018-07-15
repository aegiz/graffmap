'use strict';

var $pannelRightPopinAnything = $('.pannel-right-popin--anything');
var $pannelRightPopinCity = $('.pannel-right-popin--city');
var $pannelRightPopinGraff = $('.pannel-right-popin--graff');
var $pannelRightBarAnything = $('.pannel-right-bar__search-anything');
var $pannelRightBarCity = $('.pannel-right-bar__switch-city');

$(function() {
	var centerMapOnGraff =
		$pannelRightPopinGraff.attr('data-state') === 'graff' ? true : false;
	// Load the map and position marker
	graffmap.loader.init(centerMapOnGraff, function(renderedMap) {
		// Actions related to the right bar
		graffmap.pannelrightbar.init();

		// Actions related to the right popin (hidden by default)
		graffmap.pannelrightpopin.init();

		// Actions related to the controls of the map
		graffmap.controls.init(renderedMap);
	});
});
