var mongoose = require('mongoose');

function dbConnect() {
	console.log("Connecting to db - college_teams");
	 return mongoose.connect('mongodb://localhost/college_teams');
}

module.exports = dbConnect;