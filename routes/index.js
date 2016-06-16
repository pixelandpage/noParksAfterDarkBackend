var express = require('express');
var request = require('request');
var router = express.Router();
var hereAppID = process.env.HERE_APP_ID;
var hereAppCode = process.env.HERE_APP_CODE;
var routeUrl = 'https://route.cit.api.here.com/routing/7.2/calculateroute.json';

var locationUrl = "http://geocoder.cit.api.here.com/6.2/geocode.json";
var searchText = "?searchtext=";
var locationAppId = "&app_id="+hereAppID;
var routeAppId = "?app_id="+hereAppID;
var appCode = "&app_code="+hereAppCode;
var gen = "&gen=8";
var start = '&waypoint0=geo!52.5,13.4';
var end = '&waypoint1=geo!52.5,13.45';
var mode = '&mode=fastest;car;traffic:disabled';

// var util.format()
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/location/api', function(req, res, next) {
  request.get(locationUrl + searchText + req.query.searchtext + locationAppId + appCode + gen, function(error, response, body) { //massive cognitive load
    console.log("REQ: START");
    var bodyObject = JSON.parse(body);
    console.log(bodyObject.Response.View[0].Result[0].Location);
    res.send(bodyObject); //stringify = opposite of parse
    console.log("REQ: END");
  });
  // res.render('index', { title: 'Express' });
});

router.get('/route/api', function(req, res, next) {
  request.get(routeUrl + routeAppId + appCode + start + end + mode, function(error, response, body) { //massive cognitive load
    console.log("REQ: START");
    // var bodyObject = JSON.parse(body);
    // console.log(bodyObject.Response.View[0].Result[0].Location);
    console.log(body);
    res.send(body); //stringify = opposite of parse
    console.log("REQ: END");
  });
  // res.render('index', { title: 'Express' });
});


// router.post('/route', function(req, res, next){
// });

module.exports = router;
