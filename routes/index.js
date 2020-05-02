/*******************************************************************************
*  User Requirement Definition
*  Requirement: 2 - The application should allow any user to access a default
*                   page.
*
*  Status: Completed.
*******************************************************************************/
var express = require('express');
var router = express.Router();

/**
 *  This GET method gathers the 'index' resource and renders it.
 *
 *  @param {JSON Obj} req - Contains user-supplied data.
 *  @param {JSON Obj} res - Contains the response object for user.
 *  @param {Callback Arg} next - Callback argument for middleware functions.
 */
router.get('/', function(req, res, next) {
  // Render the 'index' page and passes user data.
  res.render('index', {
    user: req.user
  });
});

module.exports = router;
