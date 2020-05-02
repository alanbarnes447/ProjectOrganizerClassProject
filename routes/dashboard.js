/*******************************************************************************
*  User Requirement Definition
*  Requirement: 8 - The application should include and render a dynamic
*                   ‘dashboard’ page.
*
*  Status: Completed.
*******************************************************************************/
var express = require('express');
var router = express.Router();

const Event = require('../models/event');
const { ensureAuthenticated } = require('../config/auth');

var events = [];

router.get('/', ensureAuthenticated, function(req, res, next) {
  var eventsTP = []; // Task panel version of events.
  var eventsFC = []; // FullCalendar version of events.

  Event.find({ email: req.user.email }) // { _id: 0 }
    .stream()
    .on('data', function(event) { // For loop to iterate through results of query.
      // Globalize events retrieved into a separate array from DB.
      events.push(event);
      // Add events into array for task panel.
      eventsTP.push(event);
    })
    .on('error', function(err) {
      res.send('Error retrieving event(s).');
    })
    .on('end', function() {
      events.forEach(event => {
        delete events._id
        delete events.email
        delete events.desc
        delete events.status
        eventsFC.push(event);
      });

      events = [];

      // let success = [];
      // success.push({ alert: 'Successfully loaded events.' });

      res.render('dashboard', {
        user: req.user,
        eventsFC: eventsFC,
        eventsTP: eventsTP
      });
    })
});

router.post('/add-event', function(req, res, next) {
  const { email, title, desc, status, start, allDay } = req.body;
  const newEvent = new Event({ email, title, desc, status, start, allDay });

  newEvent.save()
    .then(user => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

router.post('/delete-event', function(req, res, next) {

});

router.post('/update-event', function(req, res, next) {

});

module.exports = router;
