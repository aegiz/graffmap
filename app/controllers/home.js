const express = require('express');
const router = express.Router();
const graffAPI = require("./api/graff.js");
const config = require("../../config/config.js");

/*
GET /
Render the homepage
*/

router.get('/', (req, res, next) => {
   res.render('index', { title: 'Graffmap', type:'pannel-right-close', graffs: [], apiKey: config.apiKey });
});

module.exports = router;
