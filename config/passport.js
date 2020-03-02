const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            console.log('User with that email not found.');
            return done(null, false, { message: 'User with that email does not exist.'});
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              console.log('DING! DING! DIIING!!!');
              return done(null, user)
            } else {
              console.log('Incorrect password.');
              return done(null, false, { message: 'Incorrect password.'})
            }
          });
        })
        .catch(err => console.log(err))
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
