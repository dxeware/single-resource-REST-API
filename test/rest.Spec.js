"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var db = require('../app/models/db');
var app = require('../app/app');
var LSU_id = 0;
var port = 3001;

chai.use(chaiHttp);

function findByName(res, name) {
	for (var i=0; i < res.body.length; i++) {
		if (res.body[i].name === name) {
			return res.body[i]._id;	
		}
	}
}

function chaiRequest() {
 	return chai.request(`localhost:${port}`);
}

describe('Single Resource REST API', function() {
	before(function(done) {
		var conn = db('mongodb://localhost/college_teams');
		conn.connection.on('open', function() {
    	conn.connection.db.dropDatabase(function() {
   			console.log('======Dropped DBs========\n');
   			app.listen(port, done);
    	});
    });
	});

	it('GET /api request should return WELCOME!', function(done) {
		chaiRequest()
			.get('/api')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.message).to.equal('WELCOME!');
				done();
			});
	});

	it('GET /api/collegeteams request should respond with no data before data is added to DB', function(done) {
		chaiRequest()
			.get('/api/collegeteams')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.empty;
				done();
			});
	});

	it('POST /api/collegeteams request should add a team to DB', function(done) {
		chaiRequest()
			.post('/api/collegeteams')
			.send({ name: 'LSU', mascot: 'tiger' })
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.message).to.equal('LSU added to DB');
				done();
			});
	});

	it('GET /api/collegeteams request should respond with LSU data after LSU was added to DB', function(done) {
		chaiRequest()
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

	it('POST /api/collegeteams request should add a 2nd team to DB', function(done) {
		chaiRequest()
			.post('/api/collegeteams')
			.send({ name: 'Oregon', mascot: 'duck' })
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.message).to.equal('Oregon added to DB');
				done();
			});
	});

	it('GET /api/collegeteams request should respond with LSU and Oregon data after Oregon is added to DB', function(done) {
		chaiRequest()
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

	it('DELETE /api/collegeteams/:id should delete Oregon data after finding Oregon ID', function(done) {
		chaiRequest()
			.get('/api/collegeteams')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				var id = findByName(res, 'Oregon');

				chaiRequest()
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

	it('PUT /api/collegeteams/:id request should update LSU mascot data', function(done) {
		chaiRequest()
			.get('/api/collegeteams')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				LSU_id = findByName(res, 'LSU');
				
				chaiRequest()
					.put('/api/collegeteams/' + LSU_id)
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

	it('GET /api/collegeteams/:id request should respond with NEW LSU data after LSU mascot was updated', function(done) {
		chaiRequest()
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

	it('GET request to UNKNOWN route should respond with 404', function(done) {
		chaiRequest()
			.get('/api/nflteams')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(404);
				done();
			});
	});

	it('GET request to UNKNOWN ID should respond with an ERROR message', function(done) {
		chaiRequest()
			.get('/api/collegeteams/999999999999')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res.body.error).to.equal('Error fetching ID');
				done();
			});
	});

	it('POST /api/collegeteams request FAILS due to DATA VALIDATION b/c mascot is required', function(done) {
		chaiRequest()
			.post('/api/collegeteams')
			.send({ name: 'Virginia' })
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.message).to.equal('CollegeTeam validation failed');
				done();
			});
	});
});