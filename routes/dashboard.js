var express = require('express');
var router = express.Router();

const Event = require('../models/event');

const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, function(req, res, next) {
  var events = [];
  
  Event.find({
      email: req.user.email
    }, {
      _id: 0
    })
    .stream()
    .on('data', function(event) {
      delete event.email
      events.push(event)
    })
    .on('error', function(err) {
      res.send('Error retrieving event(s).');
    })
    .on('end', function() {
      console.log(events);

      res.render('dashboard', {
        user: req.user,
        event: events
      });
    })
});

router.post('/add-event', function(req, res, next) {
  const { email, title, start, allDay } = req.body;

  const newEvent = new Event({
    email,
    title,
    start,
    allDay
  });

  newEvent.save()
    .then(user => {
      res.redirect('/')
    })
    .catch(err => console.log(err));
});

module.exports = router;
