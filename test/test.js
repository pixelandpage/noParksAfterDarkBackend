var express = require('express');
var request = require('supertest');
var expect = require('Chai').expect;
var server = require('../lib/server.js');
var chai = require('chai'),
  chaiHttp = require('chai-http');
var assert = chai.assert;
var app = express();
var http = require('http');

chai.use(chaiHttp);


describe('Backend Api', function() {
  it('should return 200', function(done) {
    http.get('http://localhost:3000', function(res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('location/api route is accessible with status 200', function(done) {
    http.get('http://localhost:3000/location/api', function(res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('route/api route is accessible with status 200', function(done) {
    http.get('http://localhost:3000/route/api/?starttext=e1%205aq&endtext=e1%206lt', function(res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('location/api route returns JSON', function(done) {
    chai.request('http://localhost:3000')
      .get('/location/api/?searchtext=e15aq')
    .end(function (err, res) {
      expect(err).to.be.null;
      assert.equal(200, res.statusCode);
      expect(res).to.be.json;
      done();
    });
  });

  it('route/api route returns JSON', function(done) {
    chai.request('http://localhost:3000')
      .get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
    .end(function (err, res) {
      expect(err).to.be.null;
      assert.equal(200, res.statusCode);
      expect(res).to.be.json;
      done();
    });
  });

  it('should return the correct long and lat when using location/api', function(done) {
    chai.request('http://localhost:3000')
      .get('/location/api/?searchtext=50%20commercial%20street%20london')
    .end(function (err, res) {
      expect(err).to.be.null;
      assert.equal(200, res.statusCode);
      expect(res).to.be.json;
      expect(res.body.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude).to.equal(51.5173562);

      done();
    });
  });
});





//   it('should return the correct long and lat for commercial street when using location/api',function(done){
//     request.get('/location/api/?searchtext=50%20commercial%20street%20london')
//     .expect('Content-Type', /json/)
//       .end(function(err, res){
//         console.log(res);
//         expect(res.body.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude).to.equal(51.5173562);
//         expect(res.body.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude).to.equal(-0.0735515);
//         done(err);
//       });
//   });

//
// describe('server', function() {
// before(function() {
//   server.listen(3000);
// });
//
// after(function() {
//   server.close();
// });
//
//
//
//   it('app is online with status 200', function(done) {
//     request.get('/').expect(200, function(err, res){
//       done(err);
//     });
//   });
//
//   it('location/api route is accessible with status 200', function(done) {
//       request.get('https://localhost:3000/location/api').expect(200, function(err, res){
//         done(err);
//       });
//   });
//
//   it('route/api route is accessible with status 200',function(done){
//     request.get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
//       .expect(200)
//       .end(function(err, res){
//         done(err);
//       });
//     });
//
//   it('location/api route returns JSON',function(done){
//     request.get('/location/api/?searchtext=e15aq')
//       .expect('Content-Type', /json/)
//       .end(function(err, res){
//         expect(res.status).to.equal(200);
//         done(err);
//       });
//   });
//
//   it('route/api route returns JSON',function(done){
//     request.get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
//       .expect('Content-Type', /json/)
//       .end(function(err, res){
//         expect(res.status).to.equal(200);
//         done(err);
//       });
//   });
//
//   it('route/api should return error if incorrect params',function(done){
//     request.get('/route/api/?london,paris')
//       .expect('Content-Type', /json/)
//       .end(function(err, res){
//         expect(res.status).to.equal(503);
//         done(err);
//       });
//   });
//
//   it('location/api should return error if incorrect params',function(done){
//     request.get('/locations/api')
//       .end(function(err, res){
//         console.log(res);
//         expect(res.status).to.equal(404);
//         done(err);
//       });
//   });
//
// });
