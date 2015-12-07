"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes/router.js');

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use('/', router);

module.exports = app;