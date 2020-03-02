var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/', function(req, res, next) {
  const { username, email, password } = req.body;
  const regUsername = username;
  const regEmail = email;
  const loginEmail = email;

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
          const newUser = new User({
            username,
            email,
            password
          });

          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save new user in DB
            newUser.save()
              .then(user => {
                let success = [];
                success.push({ alert: 'Account created! Please login.' });

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
