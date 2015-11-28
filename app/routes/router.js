"use strict";

var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

router.get('/', function(req, res, next) {
	res.render('index', {title: 'Express', user: req.user });
});

router.get('/register', function(req, res) {
	res.render('register', {});
});

router.post('/register', function(req, res) {
	Account.register(new Account({
		username: req.body.username
	}),
	req.body.password, function(err, account) {
		if (err) {
			return res.render('register', {
				info: 'Sorry, username is not available'
			});
		}
		passport.authenticate('local')(req, res, function() {
			res.redirect('/');
		});
	});
});

router.get('/login', function(req, res) {
	res.render('login', {user: req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


module.exports = router;