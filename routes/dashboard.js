var express = require('express');
var router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('dashboard', {
    user: req.user
  });
});

module.exports = router;
