"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./app/routes/router.js');

app.use(bodyParser.json());

function startServer() {
	
	app.use('/api', router);

	var server = app.listen(3000, function() {
		console.log('Listening on port 3000.....');
		return server;
	});
}

module.exports = startServer;