"use strict";

var db = require('./app/models/db');
var app = require('./app/app');

db('mongodb://localhost/college_teams');

var server = app.listen(3000, function() {
	console.log('Listening on port 3000.....');
});