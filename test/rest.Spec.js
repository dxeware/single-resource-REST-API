"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

//require('../server.js');

chai.use(chaiHttp);

describe('Single Resource REST API', function() {
	var server;
	server = require('../server.js', { bustCache: true });
	// beforeEach(function() {
	// 	server = require('../server.js', { bustCache: true });
	// });
	// afterEach(function(done) {
	// 	server.close(done);
	// });
	it('should respond to a GET request', function(done) {
		chai.request('localhost:3000')
			.get('/api')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.message).to.equal('WELCOME!');
				done();
			});
	});
	it('should respond with no data to GET /collegeteams request before data is added to DB', function(done) {
		chai.request('localhost:3000')
			.get('/api/collegeteams')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.empty;
				done();
			});
	});
});