"use strict";

var startServer = require('../server');
var dbConnect = require('./models/db');

// Start the server
startServer();

// Connect to DB
dbConnect('mongodb://localhost/college_teams');
