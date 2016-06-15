var express = require('express');
var request = require('request');
var router = express.Router();
var url = "";
var hereAppID = process.env.HERE_APP_ID;
var hereAppCode = process.env.HERE_APP_CODE;

/* GET home page. */
router.get('/route', function(req, res, next) {
  request.get(url, function(error, response, body) {
    console.log("REQ: START");
    console.log(body);
    console.log("REQ: END");
  });
  // res.render('index', { title: 'Express' });
});

router.post('/route', function(req, res, next){
});

module.exports = router;
