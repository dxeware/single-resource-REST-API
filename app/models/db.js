"use strict";

var mongoose = require('mongoose');

function dbConnect(uri) {
	console.log('Connecting to db - ' + uri);
	return mongoose.connect(uri);
}

module.exports = dbConnect;