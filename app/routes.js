/* eslint-disable global-require, func-names */

module.exports = function (app) {
	// Pages
	app.use('/', require('./controllers/home'));
	app.use('/graff', require('./controllers/graff'));
	app.use('/graff/:id', require('./controllers/graff'));
	app.use('/user', require('./controllers/user'));
	// API
	app.use('/api/graff', require('./controllers/api/graff'));
	app.use('/api/user', require('./controllers/api/user'));
};
