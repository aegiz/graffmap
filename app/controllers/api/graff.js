const express = require('express');
const router = express.Router();
const config = require('../../../config/config');
const ObjectId = require('mongodb').ObjectId;
const helpers = require('../../helpers/utils');

var getSingleGraffByDbId = function(req, res, next) {
	var o_id = new ObjectId(req.params.id);
	req.db.collection(config.bdd).find({"_id":o_id}).toArray(function(error, results) {
		if (error) {
			res.json("err");
		}
		res.json(results);
	});
};

var getSingleGraffByObjId = function(req, res, next) {
	req.db.collection(config.bdd).findOne({"objectId":req.params.id}, function(error, result) {
		if (error) throw error;
		next(result);
	});
};

var getCloseGraff = function(lng, lat, dist, req, res, next) {
	req.db.collection(config.bdd).createIndex({"location":"2dsphere"});
	req.db.collection(config.bdd).find({
	  location:
		{ $near :
			{
				$geometry: { type: "Point",  coordinates: [lng, lat] },
				$minDistance: 0,
				$maxDistance: parseInt(dist)
			}
		}
	}, function (err, cursor) {
		cursor.toArray(function(err, array) {
			next(array);
		});
	})
};


/* 
GET /graff/close
Get a list of all the graffs close to the user
curl -XGET 'http://localhost:7000/api/graff/close?lng=-0.227777&lat=51.5138448&dist=10000'
*/

router.get('/close', (req, res, next) => {
	getCloseGraff(parseFloat(req.query["lng"]), parseFloat(req.query["lat"]), req.query["dist"], req, res, function(graffs) {
		res.json(graffs);
	});
});


/* 
GET /api/graff/id 
Get the graff info (the param is the id of the graff in db)
curl -XGET http://localhost:7000/api/graff/5a1995e23dfda12eff6e18f4
*/
router.get('/:id', (req, res, next) => {
	getSingleGraffByDbId(req, res, function(graffs) {
		res.json(graffs);
	});
});

module.exports = router;
module.exports.getSingleGraffByObjId = getSingleGraffByObjId;
module.exports.getCloseGraff = getCloseGraff;