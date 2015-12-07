"use strict";

var express = require('express');
var router = express.Router();
var CollegeTeam = require('../models/college_team');

router.use(function(req, res, next) {
  next();
});

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
	.post(function(req, res) {
		var team = new CollegeTeam();

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
				res.json({error: "Error fetching ID"});
			} else {
				res.json(team);
			}
		});
	})
	.put(function(req, res) {
		var id = req.params.id;
		CollegeTeam.findById(id, function(err, team) {
			if (err) {
				res.json({error: "Error fetching ID"});
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

module.exports = router;