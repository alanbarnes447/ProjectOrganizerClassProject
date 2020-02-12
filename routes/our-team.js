var express = require('express');
var router = express.Router();

/* GET 'Our Team' page. */
router.get('/', function(req, res, next) {
  res.render('our-team');
});

module.exports = router;
