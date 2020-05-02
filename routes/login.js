/*******************************************************************************
*  User Requirement Definition
*  Requirement: 4 - The application should allow users with an account to login.
*
*  Status: Completed.
*******************************************************************************/
var express = require('express');
var router = express.Router();

// Import Passport.js dependency.
var passport = require('passport');

/**
 *  This POST method takes the req object and destroys the session variable that
 *  holds the users logged in status and checks to make sure that the user login
 *  was successful. Redirect is based on success or failure.
 *
 *  @param {JSON Obj} req - Contains user-supplied data.
 *  @param {JSON Obj} res - Contains the response object for user.
 *  @param {Callback Arg} next - Callback argument for middleware functions.
 */
router.post('/', function(req, res, next) {
  // Authenticate user exisis in DB using Passport.js and then redirects depending
  // on the result.
  passport.authenticate('local', {
    successRedirect: 'dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
