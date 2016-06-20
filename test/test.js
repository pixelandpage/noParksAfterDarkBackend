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


  it('returns 200', function(done) {
    request.get('')
      .expect(200)
      .end(function(err, res){
        done(err);
      });
  });

  it('returns 200', function(done) {
    request.get('/location/api')
      .expect(200)
      .end(function(err, res){
        done(err);
      });
  });

  it('can use route/api',function(done){
    request.get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done(err);
      });
    });

  it('returns JSON when using location/api',function(done){
    request.get('/location/api/?searchtext=e15aq')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done(err);
      });
  });

  it('returns JSON when using route/api',function(done){
    request.get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        done(err);
      });
  });
  //
  it('should return the correct long and lat for commercial street when using location/api',function(done){
    request.get('/location/api/?searchtext=50%20commercial%20street%20london')
    .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res).to.contain('51.5173562');
      })
      .end(function(err, res){
        done(err);
      });
  });

  it('returns JSON when using route/api',function(done){
    request.get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        done(err);
      });
  });
});
