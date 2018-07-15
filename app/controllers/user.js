const express = require('express');
const router = express.Router();

/*
GET /user
Render the /user page
*/

router.get('/', function(req, res, next) {
	res.render('user', { title: 'Graffmap' });
});

module.exports = router;