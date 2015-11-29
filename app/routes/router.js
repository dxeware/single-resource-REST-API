"use strict";

var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

router.get('/', function(req, res) {
	res.render('index', {title: 'Express', user: req.user });
});

router.get('/register', function(req, res) {
	res.render('register', {message: req.flash('error') });
});

router.post('/register', function(req, res) {
	Account.register(new Account({
		username: req.body.username
	}),
	req.body.password, function(err) {
		if (err) {
			req.flash('error', 'Sorry, username is not available');
			res.redirect('/register');
		} else {
			passport.authenticate('local')(req, res, function() {
				res.redirect('/');
			});
		}
	});
});

router.get('/login', function(req, res) {
	res.render('login', {user: req.user, message: req.flash('error')});
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: 'Invalid username or pass.' } ));

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


module.exports = router;