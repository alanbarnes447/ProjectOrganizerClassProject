/*******************************************************************************
*  User Requirement Definition
*  Requirement: 5 -	The application should allow the user to sign-out.
*
*  Status: Completed.
*******************************************************************************/
var express = require('express');
var router = express.Router();

// Import Passport.js dependency.
var passport = require('passport');

/**
 *  This POST method takes the req object and destroys the session variable that
 *  holds the users logged in status.
 *
 *  @param {JSON Obj} req - Contains user-supplied data.
 *  @param {JSON Obj} res - Contains the response object for user.
 *  @param {Callback Arg} next - Callback argument for middleware functions.
 */
router.post('/', function(req, res, next) {
  // Destroy session variable.
  req.logout();

  // Create success message for user.
  let success = [];
  success.push({ alert: 'Sign out successful.' });

  // Render the homepage and pass success message for user.
  res.render('index', {
    success
  })
});

module.exports = router;
