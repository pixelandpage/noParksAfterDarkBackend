var express = require('express');
var request = require('supertest')('https://no-parks-after-dark-backend.herokuapp.com');
var expect = require('Chai').expect;
var server = require('../lib/server.js');
var chai = require('chai');
var app = express();

describe('server response', function () {
//   before(function () {
//   server.listen(3000);
// });
//
// after(function () {
//   server.close();
// });


  it('heroku app is online with status 200', function(done) {
    request.get('').expect(200, function(err, res){
      done(err);
    });
  });

  it('location/api route is accessible with status 200', function(done) {
      request.get('/location/api').expect(200, function(err, res){
        done(err);
      });
  });

  it('route/api route is accessible with status 200',function(done){
    request.get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
      .expect(200)
      .end(function(err, res){
        done(err);
      });
    });

  it('location/api route returns JSON',function(done){
    request.get('/location/api/?searchtext=e15aq')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done(err);
      });
  });

  it('route/api route returns JSON',function(done){
    request.get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done(err);
      });
  });

  it('route/api should return error if incorrect params',function(done){
    request.get('/route/api/?starttext=london&endtext=paris')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        expect(res.status).to.equal(503);
        done(err);
      });
  });

  it('location/api route returns JSON',function(done){
    request.get('/location/api/?searchtext=london1988')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        expect(res.status).to.equal(503);
        done(err);
      });
  });

  it('should return the correct long and lat for commercial street when using location/api',function(done){
    request.get('/location/api/?searchtext=50%20commercial%20street%20london')
    .expect('Content-Type', /json/)
      .end(function(err, res){
        expect(res.body.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude).to.equal(51.5173562);
        expect(res.body.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude).to.equal(-0.0735515);
        done(err);
      });
  });
});
