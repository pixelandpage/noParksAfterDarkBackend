var express = require('express');
var request = require('request');
var router = express.Router();
var hereAppID = process.env.HERE_APP_ID;
var hereAppCode = process.env.HERE_APP_CODE;

var url = "http://geocoder.cit.api.here.com/6.2/geocode.json";
var searchArgument = "200%20S%20Mathilda%20Sunnyvale%20CA";

var searchText = "?searchtext="+searchArgument;
var appId = "&app_id="+hereAppID;
var appCode = "&app_code="+hereAppCode;
var gen = "&gen=8";

// var util.format()

/* GET home page. */
router.get('/route', function(req, res, next) {
  request.get(url + searchText + appId + appCode + gen, function(error, response, body) { //massive cognitive load
    console.log("REQ: START");
    var bodyObject = JSON.parse(body);
    console.log(bodyObject.Response.View[0].Result[0].Location);
    res.send(body); //stringify = opposite of parse
    console.log("REQ: END");
  });
  // res.render('index', { title: 'Express' });
});

router.post('/route', function(req, res, next){
});

module.exports = router;
