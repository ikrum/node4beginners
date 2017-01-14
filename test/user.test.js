"use strict";

var request = require('supertest');
var expect = require("chai").expect;
//var app = require('../app');


var apiEndpoint = "http://localhost:3000";
var userProfile = {
	fname: 'Foo',
	lname: 'Bar',
	password: '123456',
	email: getRandomEmail()
};
var authToken = "";


/*
 * User tests
 */
describe('User', function() {

	context('#Account', function () {
		it('should Create an account', function (done) {
			request(apiEndpoint)
        .post('/api/users')
	  		.send(userProfile)
	  		.end(function(err, res){
	  			expect(res.status).to.equal(200);
	  			userProfile.userid = res.body.data.userid;
					done();
				});
		});

		it('should return Email already exists', function (done) {
		  	request(apiEndpoint)
          .post('/api/users')
  	  		.send(userProfile)
  	  		.end(function(err, res) {
  	  			expect(res.status).to.equal(400);
  					expect(res.body.message).to.equal("Email already exists");
  					done();
  	      });
		});

		it('should return token on Login success', function (done) {
			request(apiEndpoint)
        .post('/api/auth')
  			.send(userProfile)
  			.end(function(err, res){
  				expect(res.status).to.equal(200);
  				expect(res.body.data.token).to.be.a('string');
          authToken = res.body.data.token;
  				done();
  			});
		});

		it('should return "No user found" for login', function (done) {
		  request(apiEndpoint)
        .post('/api/auth')
  			.send({email: getRandomEmail(),password:"12345"})
        .expect(400)
        .then(function(res){
  				expect(res.body.message).to.equal("No user found");
  				done();
        })
        .catch(done);
		});

		it('should ask for authentication for user info', function (done) {
		  request(apiEndpoint)
        .get('/api/users/'+userProfile.userid)
  			.send()
        .expect(401)
        .then(function(res){
  				expect(res.body.message).to.equal("Authentication token required");
  				done();
        })
        .catch(done);
		});

		it('should return "Authentication token invalid"', function (done) {
		  request(apiEndpoint)
        .get('/api/users/'+userProfile.userid)
        .set('token', "RandomTOken-sdfjsldf")
  			.send()
        .expect(401)
        .then(function(res){
  				expect(res.body.message).to.equal("Authentication token invalid");
  				done();
        })
        .catch(done);
		});

		it('should return array of all users', function (done) {
		  request(apiEndpoint)
        .get('/api/users/')
        .set('token', authToken)
  			.send()
        .expect(200)
        .then(function(res){
  				expect(res.body.data).to.have.length.above(0);
  				expect(res.body.data).to.have.length.of.at.least(2);
  				done();
        })
        .catch(done);
		});

		it('should delete the account', function (done) {
		  request(apiEndpoint)
        .delete('/api/users/'+userProfile.userid)
        .set('token', authToken)
  			.send()
        .expect(200)
        .then(function(res){
  				expect(res.body.message).to.equal("User deleted");
  				done();
        })
        .catch(done);
		});
	});
});



function getRandomEmail(){
	return Math.random().toString(36).substring(7)+"@host.com";
}
