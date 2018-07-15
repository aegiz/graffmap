'use strict';

var graffmap = graffmap || {};

graffmap.controls = (function(window, document) {
	var $bottomBar = $('.bottom-bar');
	var _carouselContainer = $('.bottom-bar__inview');

	function _initRecenterPosition(renderedMap) {
		$bottomBar
			.find('.bottom-bar__actioner--currentloc-icon')
			.on('click', function() {
				graffmap.loader.recenterOnUser(renderedMap);
			});
		$('.main-logo').on('click', function() {
			graffmap.loader.recenterOnUser(renderedMap);
		});
	}

	function _zoomIn(renderedMap) {
		renderedMap.setZoom(renderedMap.getZoom() + 1);
	}

	function _zoomOut(renderedMap) {
		renderedMap.setZoom(renderedMap.getZoom() - 1);
	}

	function _initZoom(renderedMap) {
		$bottomBar.find('.bottom-bar__actioner--zoom-in').on('click', function() {
			_zoomIn(renderedMap);
		});
		$bottomBar
			.find('.bottom-bar__actioner--zoom-out')
			.on('click', function() {
				_zoomOut(renderedMap);
			});
	}

	function _displayHideGridPreviewer(markersInView) {
		if (
			$.isEmptyObject(markersInView) ||
			$bottomBar.hasClass('bottom-bar--show')
		) {
			$bottomBar.removeClass('bottom-bar--show');
			return 'hide';
		} else {
			$bottomBar.addClass('bottom-bar--show');
			return 'refresh';
		}
	}

	function _refreshCarousel(markersInView) {
		// Remove the whole carousel
		_carouselContainer.empty().append("<div class='owl-carousel'></div>");
		var carousel = _carouselContainer.find('.owl-carousel');
		// Append new content
		for (var marker in markersInView) {
			// prettier-ignore
			var item = "<div class='item' data-id='" + marker + "'>" +
				"<img src='/img/graffs/mini/" + markersInView[marker].name + ".jpg' />" +
			"</div>";
			carousel.append(item);
		}
		// Wait until carousel is initialised and setup click events
		carousel.on('initialized.owl.carousel', function(event) {
			carousel.find('.item').on('click', function() {
				graffmap.pannelrightpopin.openGraff($(this).attr('data-id'));
			});
		});
		// Reinit owl
		var itemToDisplay = 15;
		var nbMarker = _.size(markersInView);
		if (nbMarker < itemToDisplay) {
			itemToDisplay = nbMarker;
		}
		carousel.owlCarousel({
			loop: false,
			stagePadding: 5,
			margin: 10,
			nav: false,
			center: false,
			responsive: {
				0: {
					items: Math.round(itemToDisplay / 2)
				},
				768: {
					items: Math.round(itemToDisplay / 2)
				},
				1000: {
					items: itemToDisplay
				}
			}
		});
	}

	function _initGridPreviewer(renderedMap) {
		$bottomBar
			.find('.bottom-bar__actioner--grid-icon')
			.on('click', function() {
				var markersInView = graffmap.map.retrieveMarkersInView(renderedMap);
				var status = _displayHideGridPreviewer(markersInView);
				if (status === 'refresh') {
					_refreshCarousel(markersInView);
				}
			});
		$(document).on('keyup', function(ev) {
			if (ev.keyCode == 27) {
				$bottomBar.removeClass('bottom-bar--show');
			}
		});
	}

	function init(renderedMap) {
		_initGridPreviewer(renderedMap);
		_initZoom(renderedMap);
		_initRecenterPosition(renderedMap);
	}

	return {
		init: init
	};
})(window, document);
