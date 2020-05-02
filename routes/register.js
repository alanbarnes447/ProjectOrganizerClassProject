/*******************************************************************************
*  User Requirement Definition
*  Requirement: 3 - The application should allow new users to register.
*
*  Status: Completed.
*******************************************************************************/
var express = require('express');
var router = express.Router();

// Import bcrypt dependency.
var bcrypt = require('bcryptjs');
// Import 'User' model from directory.
const User = require('../models/user');

/**
 *  This POST method takes user defined date from the req object and checks to
 *  see if the user already has an acccount. If the user does not have an
 *  account, then a new account will be created.
 *
 *  @param {JSON Obj} req - Contains user-supplied data.
 *  @param {JSON Obj} res - Contains the response object for user.
 *  @param {Callback Arg} next - Callback argument for middleware functions.
 */
router.post('/', function(req, res, next) {
  // Init user account variables.
  const { username, email, password } = req.body;
  const regUsername = username;
  const regEmail = email;
  const loginEmail = email;

  // Init errors array for alerts to pass in response.
  let errors = [];

  // Check required fields
  if (!username || !email || !password) {
    errors.push({ alert: 'Please fill out all fields' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ alert: 'Password should be 6 or more characters' });
  }

  // If any errors exist
  if (errors.length > 0) {
    res.render('index', {
      errors,
      regUsername,
      regEmail
    });
  } else {
    // Registration successful.
    User.findOne({ email: email }) // Check if user already is in DB.
      .then(user => {
        if (user) {
          // User already exists.
          errors.push({ alert: 'Account with that email already exists' });
          res.render('index', {
            errors,
            regUsername,
            regEmail
          });
        } else {
          // User doesn't exist, create a new one.
          const newUser = new User({
            username,
            email,
            password
          });

          // Generate hash to encrypt user password.
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to generated hash.
            newUser.password = hash;
            // Save new user in DB.
            newUser.save()
              .then(user => {
                // Create success message for user.
                let success = [];
                success.push({ alert: 'Account created! Please login.' });

                // Render the homepage and pass success message for user, plus
                // account email for the users first time sign in to be faster.
                res.render('index', {
                  success,
                  loginEmail
                })
              })
              .catch(err => console.log(err));
          }))
        }
      });
    }
});

module.exports = router;
