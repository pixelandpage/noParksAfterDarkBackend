var request = require("supertest");
var express = require('express');
var app = express();

describe('BackendApi', function(){
  it('can use location/api',function(){
    request(app)
      .get('/location/api')
      .end(function(res){
        expect(res.status).to.equal(200);
    });
  });

  it('can use route/api',function(){
    request(app)
      .get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
      .end(function(res){
        expect(res.status).to.equal(200);
    });
  });

  it('returns JSON when using location/api',function(){
    request(app)
      .get('/location/api')
      .expect('Content-Type', /json/);
  });

  it('returns JSON when using route/api',function(){
    request(app)
      .get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
      .expect('Content-Type', /json/);
  });

  it('should return the correct long and lat for commercial street when using location/api',function(){
    request(app)
      .get('/location/api/?searchtext=50%20commercial%20street%20london')
      .expect(function(res) {
        res.body.Response.View[0].Result[0].Location.NavigationPostion[0].Latitude = '51.5173562';
        res.body = 'Logitude:-0.0773git s515';
      })
      .expect('Content-Type', /json/);
  });

  // it('returns JSON when using route/api',function(){
  //   request(app)
  //     .get('/route/api/?starttext=e1%205aq&endtext=e1%206lt')
  //     .expect('Content-Type', /json/);
  // });
});
