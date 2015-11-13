var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	name: String,
	mascot: String
});

module.exports = mongoose.model('CollegeTeam', TeamSchema);