/*******************************************************************************
*  User Requirement Definition
*  Requirement: 7 - The application should include and render an ‘our team’
*                   page.
*
*  Status: Completed.
*******************************************************************************/
var express = require('express');
var router = express.Router();

/**
 *  This GET method gathers the 'our-team' resource and renders it.
 *
 *  @param {JSON Obj} req - Contains user-supplied data.
 *  @param {JSON Obj} res - Contains the response object for user.
 *  @param {Callback Arg} next - Callback argument for middleware functions.
 */
router.get('/', function(req, res, next) {
  // Render the 'our-team' page and passes user data.
  res.render('our-team', {
    user: req.user
  });
});

module.exports = router;
