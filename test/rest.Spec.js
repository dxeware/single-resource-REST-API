"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var LSU_id = 0;

//require('../server.js');

chai.use(chaiHttp);

function findByName(res, name) {
	for (var i=0; i < res.body.length; i++) {
		if (res.body[i].name === name) {
			return res.body[i]._id;	
		}
	}
}

describe('Single Resource REST API', function() {

	var server;
	server = require('../server.js', { bustCache: true });
	//before(function (done) {   
   // var con = mongoose.connect('mongodb://localhost/college_teams');
   // console.log('connection made');
    //mongoose.connection.on('open', function() {
   // 	con.connection.db.dropDatabase();
    	//	console.log('dropped dbs');
     	//	done();
  		//});
  	//});
  //});
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
	it('a PUT request to /collegeteams should add a team to DB', function(done) {
		chai.request('localhost:3000')
			.put('/api/collegeteams')
			.send({ name: 'LSU', mascot: 'tiger' })
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.message).to.equal('LSU added to DB');
				done();
			});
	});
	it('should respond with LSU data to GET /collegeteams request after LSU is added to DB', function(done) {
		chai.request('localhost:3000')
			.get('/api/collegeteams')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body[0].name).to.equal('LSU');
				expect(res.body[0].mascot).to.equal('tiger');
				done();
			});
	});
	it('a PUT request to /collegeteams should add a 2nd team to DB', function(done) {
		chai.request('localhost:3000')
			.put('/api/collegeteams')
			.send({ name: 'Oregon', mascot: 'duck' })
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.message).to.equal('Oregon added to DB');
				done();
			});
	});
	it('should respond with LSU and Oregon data to GET /collegeteams request after Oregon is added to DB', function(done) {
		chai.request('localhost:3000')
			.get('/api/collegeteams')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body[0].name).to.equal('LSU');
				expect(res.body[0].mascot).to.equal('tiger');
				done();
			});
	});
	it('should delete Oregon data to DELETE /collegeteams/:id request', function(done) {
		chai.request('localhost:3000')
			.get('/api/collegeteams')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				var id = findByName(res, 'Oregon');
				chai.request('localhost:3000')
					.del('/api/collegeteams/' + id)
					.end(function(err, res) {
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						expect(res).to.be.json;
						expect(res.body.message).to.equal('ID: ' + id + ' deleted from DB');
						done();
					});
			});
	});
	it('should update LSU mascot data to POST /collegeteams/:id request', function(done) {
		chai.request('localhost:3000')
			.get('/api/collegeteams')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				LSU_id = findByName(res, 'LSU');
				chai.request('localhost:3000')
					.post('/api/collegeteams/' + LSU_id)
					.send({ name: 'LSU', mascot: 'Mike the Tiger' })
					.end(function(err, res) {
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						expect(res).to.be.json;
						expect(res.body.message).to.equal('ID: ' + LSU_id + ' updated in DB');
						done();
					});
			});
	});
	it('should respond with NEW LSU data to GET /collegeteams/:id request after LSU mascot updated', function(done) {
		chai.request('localhost:3000')
			.get('/api/collegeteams/' + LSU_id)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.name).to.equal('LSU');
				expect(res.body.mascot).to.equal('Mike the Tiger');
				done();
			});
	});
	it('should delete NEW LSU record when receiving DELETE /collegeteams/:id request', function(done) {
		chai.request('localhost:3000')
			.del('/api/collegeteams/' + LSU_id)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.message).to.equal('ID: ' + LSU_id + ' deleted from DB');
				done();
			});
	});
});