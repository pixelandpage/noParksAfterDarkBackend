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
      expect(res.body.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude).to.equal(-0.0735515);
      done();
    });
  });

  it('location/api should return error if incorrect params', function(done) {
    chai.request('http://localhost:3000')
      .get('/location/api/searchtext=50%20commercial%20street%20london')
    .end(function (err, res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });

  it('route/api should avoid parks and tunnels when using public transport', function(done) {
    chai.request('http://localhost:3000')
      .get('/route/api/?endtext=e1%206lt&starttext=ha5%202ez&type=publicTransportTimeTable&nightmode=park:-1,tunnel:-1')
      .end(function (err, res) {
        expect(err).to.be.null;
        assert.equal(200, res.statusCode);
        expect(res).to.be.json;
        expect(res.body.response.route[0].mode.transportModes).to.include('publicTransportTimeTable');
        expect(res.body.response.route[0].mode.feature[0].value).to.equal('park');
        expect(res.body.response.route[0].mode.feature[1].value).to.equal('tunnel');
        done();
      });
  });
});
