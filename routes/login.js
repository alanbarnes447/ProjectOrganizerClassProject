var express = require('express');
var router = express.Router();

var passport = require('passport');

router.post('/', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: 'dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
