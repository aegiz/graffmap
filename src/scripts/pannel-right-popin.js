'use strict';

var graffmap = graffmap || {};

graffmap.pannelrightpopin = (function(window, document) {
	function _setupAuthor(author) {
		$pannelRightPopinGraff
			.find('.author')
			.empty()
			.append("<p class='title'>Taken by:</p><p>" + author + '</p>');
	}

	function _setupDscr(graffData) {
		$pannelRightPopinGraff.find('.description').empty();
		if (graffData.description.length !== 0) {
			// prettier-ignore
			$pannelRightPopinGraff
				.find('.description')
				.append(
					"<p class='title'>Description:</p>" + 
					"<p>" +
						graffData.description +
					"</p>"
				);
		}
	}

	function _setupDate(graffData) {
		$pannelRightPopinGraff
			.find('.date-taken')
			.empty()
			.append(
				graffmap.helpers.formatDateEurope(
					graffData.updatedAt.substring(0, 10)
				)
			);
	}

	function _setupClickOnImg() {
		$pannelRightPopinGraff
			.find('.cover-container img')
			.on('click', function() {
				// prettier-ignore
				var name = $(this).attr("src").split("/").reverse()[0];
				var desc = $(this).attr('alt');
				var img = new Image();
				$('.show-full')
					.find('.show-full__img')
					.html(img);
				img.addEventListener('load', function() {
					$('.show-full').addClass('show-full--open');
				});
				img.src = '/img/graffs/original/' + name;
				img.alt = desc;
			});
		$('.show-full').on('click', function() {
			$(this).removeClass('show-full--open');
		});
	}

	function _setupImage(graffData) {
		// prettier-ignore
		$pannelRightPopinGraff
			.find('.cover-container')
			.empty()
			.append(
				"<div class='cover'>" +
					"<img src='/img/graffs/thumbnail/" + graffData.thumbnail.name + "' alt='" +
					graffData.keywords.join(", ") + "' />" +
				"</div>"
			);

		if (typeof graffData['image2'] !== 'undefined') {
			// prettier-ignore
			$pannelRightPopinGraff
				.find(".cover-container")
				.append("<div class='cover'>" +
					"<img src='/img/graffs/thumbnail/" + graffData.image2.name + "' alt='" + graffData.description + "' />" +
				"</div>");
		}

		if (typeof graffData['image3'] !== 'undefined') {
			// prettier-ignore
			$pannelRightPopinGraff
				.find(".cover-container")
				.append("<div class='cover'>" +
					"<img src='/img/graffs/thumbnail/" + graffData.image3.name + "' alt='" + graffData.description + "' />" +
				"</div>");
		}

		_setupClickOnImg();
	}
	function _fillPopinWithData(graffData, author) {
		// Patch the URL of the page
		window.history.pushState(
			'',
			document.title,
			'/graff/' + graffData.objectId
		);

		// Fill the panel right with the correct data
		_setupImage(graffData);
		_setupDate(graffData);
		_setupDscr(graffData);
		_setupAuthor(author);
	}

	function openGraff(_id) {
		if (typeof _id === 'undefined') {
			return;
		}
		graffmap.pannelrightbar.closePannelRight();
		$pannelRightPopinGraff.addClass('open');

		$.get('/api/graff/' + _id, function(data) {
			var graffData = data[0];
			if (typeof graffData.userId !== 'undefined') {
				$.get('/api/user/' + graffData.userId + '/author', function(
					author
				) {
					_fillPopinWithData(graffData, author);
				});
			} else {
				_fillPopinWithData(graffData, 'Unknown');
			}
		});
	}

	function initRightPopin() {
		_setupClickOnImg();

		$pannelRightPopinGraff.find('.btn-close').on('click', function() {
			graffmap.pannelrightbar.closePannelRight();
		});
		$(document).on('keyup', function(ev) {
			if (ev.keyCode == 27) {
				graffmap.pannelrightbar.closePannelRight();
			}
		});
	}

	return {
		init: initRightPopin,
		openGraff: openGraff
	};
})(window, document);
