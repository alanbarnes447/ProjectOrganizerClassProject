var express = require('express');
var router = express.Router();

var passport = require('passport');

router.post('/', function(req, res, next) {
  req.logout();

  let success = [];
  success.push({ alert: 'Sign out successful.' });

  res.render('index', {
    success
  })
});

module.exports = router;
