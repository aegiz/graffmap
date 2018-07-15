'use strict';

var graffmap = graffmap || {};

graffmap.pannelrightbar = (function(window, document) {
	function _openSearchAnything() {
		var closeBtn = $pannelRightPopinAnything.find('.btn-close');
		var input = $pannelRightPopinAnything.find('input');

		$pannelRightPopinAnything.addClass('open');
		input[0].focus();
		pannelRightPopinAnythingOpen = true;
	}

	function _openSearchCity() {
		var closeBtn = $pannelRightPopinCity.find('.btn-close');
		var input = $pannelRightPopinCity.find('input');

		$pannelRightPopinCity.addClass('open');
		input[0].focus();
		pannelRightPopinCityOpen = true;
	}

	function _initSearchAnything() {
		$pannelRightBarAnything.on('click', function() {
			$('.pannel-right-popin').removeClass('open');
			_openSearchAnything();
		});
		$pannelRightPopinAnything.find('.btn-close').on('click', function() {
			closePannelRight();
		});
		$(document).on('keyup', function(ev) {
			if (ev.keyCode == 27) {
				closePannelRight();
			}
		});
	}

	function _initSearchCity() {
		$pannelRightBarCity.on('click', function() {
			$('.pannel-right-popin').removeClass('open');
			_openSearchCity();
		});
		$pannelRightPopinCity.find('.btn-close').on('click', function() {
			closePannelRight();
		});
		$(document).on('keyup', function(ev) {
			if (ev.keyCode == 27) {
				closePannelRight();
			}
		});
	}

	function closePannelRight() {
		$('.pannel-right-popin').removeClass('open');
	}

	function initPannelRightBar() {
		_initSearchAnything();
		_initSearchCity();
	}
	return {
		init: initPannelRightBar,
		closePannelRight: closePannelRight
	};
})(window, document);
