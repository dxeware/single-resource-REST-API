var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CollegeTeam = require('./app/models/college_teams');

app.use(bodyParser.json());

// Connect to DB
mongoose.connect('mongodb://localhost/college_teams');

// ROUTES
var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening...');
	next();
})

router.get('/', function(req, res) {
	res.json({message: 'WELCOME!'});
});

router.route('/collegeteams')
	.get(function(req, res) {
		CollegeTeam.find(function(err, teams) {
			if (err)
				res.send(err);

			res.json(teams);
		});
	});

app.use('/api', router);

var server = app.listen(3000, function() {
	console.log('Listening on port 3000.....');
});

module.exports = server;