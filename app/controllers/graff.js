const express = require('express');
const router = express.Router();
const graffAPI = require("./api/graff.js");
const userAPI = require("./api/user.js");
const helpers = require('../helpers/utils');
const config = require("../../config/config.js");

/*
GET /graff
Render the /graff page
*/

router.get('/', function(req, res, next) {
	res.redirect('/');
	// res.render('graff', { title: 'Graffmap' });
});


/*
GET /graff/id
Render the page for a specific graff
Ex: http://localhost:7000/graff/wgqp7wae97
*/

router.get('/:id', function(req, res, next) {
	graffAPI.getSingleGraffByObjId(req, res, function(graff) {
		// if graff exist in db
		if(graff) {
			userAPI.getDisplayName(graff.userId, req, res, function(author) {
				graffAPI.getCloseGraff(graff.location.coordinates[0], graff.location.coordinates[1], 6000, req, res, function(closeGraffs) {
					closeGraffs = closeGraffs || [];
					let cleanGraff = helpers.cleanGraffForFront(closeGraffs);
					// Insert at the first position the main graff
					cleanGraff.unshift({
						"id": graff._id,
						"lng": graff.location.coordinates[0],
						"lat": graff.location.coordinates[1],
						"name": graff.thumbnail.name,
						"description": graff.description,
						"author": author,
						"createdAt": helpers.formatDateEurope(graff.createdAt.substring(0, 10)),
						"image2": graff.image2,
						"image3": graff.image3,
						"keywords": graff.keywords.join(", ")
					});
					res.render('index', { title: 'Graffmap', type:'pannel-right-open', graffs: cleanGraff, apiKey: config.apiKey });
				})
			})
		} else {
      	res.render('index', { title: 'Graffmap', type:'pannel-right-404', graffs: [], apiKey: config.apiKey });
		}
	});
});


module.exports = router;