var express = require('express');
var request = require('request');
// var SunCalc = require('suncalc');
// require('date-utils');
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
var start = '&waypoint0=geo!';
var end = '&waypoint1=geo!';
var mode = '&mode=fastest;';// pedestrian;tunnel:-3'; // add avoid parameters here. -1 is casual avoid, -3 is avoid at all costs
var route = '&routeattributes=sh';
var departure = '&departure=now';

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/location/api', function(req, res, next) {
  request.get(locationUrl + searchText + req.query.searchtext + locationAppId + appCode + gen, function(error, response, body) {
    var bodyObject = JSON.parse(body);
    res.send(bodyObject);
  });
});

router.get('/route/api', function(req, res, next) {
    request.get(locationUrl + searchText + req.query.starttext + locationAppId + appCode + gen, function(error, response, body) {
      var bodyObject = JSON.parse(body);
      var lat = bodyObject.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
      var long = bodyObject.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
      // var times = SunCalc.getTimes(new Date(), lat, long);
        function getWaypointData(){
          var waypointData = lat.toString() + ',' + long.toString();
          return waypointData;
        }
        var start = '&waypoint0=geo!'+ getWaypointData();
    request.get(locationUrl + searchText + req.query.endtext + locationAppId + appCode + gen, function(error, response, body) {
      var bodyObject = JSON.parse(body);
      var lat = bodyObject.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
      var long = bodyObject.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
        function getWaypointData(){
          var waypointData = lat.toString() + ',' + long.toString();
          return waypointData;
        }
        var end = '&waypoint1=geo!'+ getWaypointData();
        // var currentTime = new Date();
        //   if (currentTime > times.sunset && currentTime < times.sunrise){
            request.get(routeUrl + routeAppId + appCode + start + end + route + mode + req.query.type + ';' + req.query.nightmode + departure, function(error, response, body) {
              res.send(JSON.parse(body));
            });
        //     console.log(bodyObject.Response.View);
        //     console.log("IT'S NOT SAFE!!!");
        //   } else {
        //     request.get(routeUrl + routeAppId + appCode + start + end + route + mode + req.query.type + ';' + departure, function(error, response, body) {
        //       res.send(JSON.parse(body));
        //     });
        //     console.log("IT'S SAFE!!!");
        //   }
    });
  });
});

module.exports = router;
