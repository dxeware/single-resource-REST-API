var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CollegeTeam = require('./app/models/college_team');

app.use(bodyParser.json());

// Connect to DB
mongoose.connect('mongodb://localhost/college_teams');

// ROUTES
var router = express.Router();

router.use(function(req, res, next) {
	next();
})

router.get('/', function(req, res) {
	res.json({message: 'WELCOME!'});
});

router.route('/collegeteams')
	.get(function(req, res) {
		CollegeTeam.find(function(err, teams) {
			if (err) {
				res.send(err);
			} else {
				res.json(teams);
			}
		});
	})
	.put(function(req, res) {
		var team = new CollegeTeam;

		team.name = req.body.name;
		team.mascot = req.body.mascot;

		team.save(function(err) {
			if (err) {
		 		res.send(err);
			} else {
		 		var message = team.name + ' added to DB';
				res.json({message: message});
			}
		});
	});

router.route('/collegeteams/:id')
	.get(function(req, res) {
		var id = req.params.id;
		CollegeTeam.findById(id, function(err, team) {
			if (err) {
				res.send(err);
			} else {
				res.json(team);
			}
		});
	})
	.post(function(req, res) {
		var id = req.params.id;
		CollegeTeam.findById(id, function(err, team) {
			if (err) {
				console.log('err = ' + err);
				res.send(err);
			} else {
				team.name = req.body.name;
				team.mascot = req.body.mascot;
				team.save(function(err) {
					if (err) {
		 				res.send(err);
					} else {
				  	var message = 'ID: ' + id + ' updated in DB';
						res.json({message: message});
					}
				});
			}
		});
	})
	.delete(function(req, res) {
		var id = req.params.id;
		CollegeTeam.remove({ _id: id }, function(err) {
			if (err) {
				res.send(err);
			} else {
				var message = 'ID: ' + id + ' deleted from DB';
				res.json({message: message});
			}
		});
	});

app.use('/api', router);

var server = app.listen(3000, function() {
	console.log('Listening on port 3000.....');
});

module.exports = server;