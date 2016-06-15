var express = require('express');
var router = express.Router();
var hereAppID = process.env.HERE_APP_ID;
var hereAppCode = process.env.HERE_APP_CODE;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
