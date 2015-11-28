"use strict";

var dbConnect = require('./app/models/db');
var app = require('./app/app');

dbConnect('mongodb://localhost/college_teams');

app.listen(3000, function() {
	console.log('Listening on port 3000.....');
});