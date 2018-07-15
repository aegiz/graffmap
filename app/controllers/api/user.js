const express = require('express');
const router = express.Router();
const config = require('../../../config/config');
const helpers = require('../../helpers/utils');

var getFullUserInfo = function(id, req, res, next) {
	req.db.collection(config.user).findOne({"objectId":id}, function (error, user) {
		if (error) throw error;
		next(user);
	});
};

var getDisplayName = function(id, req, res, next) {
	// Get all the info
	getFullUserInfo(id, req, res, function(user) {
		// Then decide what to display
		const author = helpers.decideOnAuthor(user.username, user.first_name);
		next(author);
	});
};

/*
GET /api/user listing
Get the user info
curl -XGET http://localhost:7000/api/user/
*/

router.get('/', function(req, res, next) {
	req.db.collection(config.user).find().toArray(function (error, results) {
		if (error) {
			res.json("err");
		}
		res.json(results);
	});
});

/* 
GET /api/user/id 
curl -XGET http://localhost:7000/api/user/s4V3TQoEqi
*/

router.get('/:id', (req, res, next) => {
	getFullUserInfo(req.params.id, req, res, function(user) {
		res.json(user);
	});
});

/* 
GET /api/user/id/author
Only get the author's name
curl -XGET http://localhost:7000/api/user/s4V3TQoEqi/author
*/

router.get('/:id/author', (req, res, next) => {
	getDisplayName(req.params.id, req, res, function(user) {
		res.json(user);
	});
});

module.exports = router;
module.exports.getDisplayName = getDisplayName;