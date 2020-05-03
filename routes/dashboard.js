/*******************************************************************************
*  User Requirement Definition
*  Requirement: 1 - The program needs to have one calendar object that is initi-
*                   alized for each specific user.
*               8 - The application should include and render a dynamic
*                   ‘dashboard’ page.
*
*  Status: Completed.
*******************************************************************************/
var express = require('express');
var router = express.Router();

// Import 'Event' model from directory.
const Event = require('../models/event');
// Import authentication function to verify users.
const { ensureAuthenticated } = require('../config/auth');

// Init temp array to store instance of events for FullCalendar.
var events = [];

/**
 *  This GET method gathers event data from our MongoDB Database and renders it
 *  into our 'dashboard' view to dynamically generate the user's calendar and
 *  task panel.
 *
 *  @param {JSON Obj} req - Contains user-supplied data.
 *  @param {JSON Obj} res - Contains the response object for user.
 *  @param {Callback Arg} next - Callback argument for middleware functions.
 */
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
      // Display error if query fails.
      res.send('Error retrieving event(s).');
    })
    .on('end', function() {
      // Iterate through the events temp array and delete unnecessary data before
      // adding it the the FullCalendar array.
      events.forEach(event => {
        delete events._id
        delete events.email
        delete events.desc
        delete events.status
        eventsFC.push(event);
      });

      // Empty global events array to prevent duplicate events.
      events = [];

      // Render 'dashboard' view with event data needed to dynamically generate
      // events.
      res.render('dashboard', {
        user: req.user,
        eventsFC: eventsFC,
        eventsTP: eventsTP
      });
    })
});

/**
 *  This POST method takes in user defined variables and creates an event to add
 *  into our database.
 *
 *  @param {JSON Obj} req - Contains user-supplied data.
 *  @param {JSON Obj} res - Contains the response object for user.
 *  @param {Callback Arg} next - Callback argument for middleware functions.
 */
router.post('/add-event', function(req, res, next) {
  // Init event vairables.
  const { email, title, desc, status, start, allDay } = req.body;
  // Create event with user passed variables above.
  const newEvent = new Event({ email, title, desc, status, start, allDay });

  // Save new event model into database and then redirect back.
  newEvent.save()
    .then(user => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

/**
 *  This POST method takes in an event _id and udpates it's status to complete.
 *
 *  @param {JSON Obj} req - Contains user-supplied data.
 *  @param {JSON Obj} res - Contains the response object for user.
 *  @param {Callback Arg} next - Callback argument for middleware functions.
 */
router.post('/update-event', function(req, res, next) {
  // Init event _id.
  const { _id } = req.body;

  // Run query to update specified event using the _id passed.
  Event.updateOne({ _id: _id }, { status: true }, function(err, res) {
    if (err) return handleError(err);
  });

  // Redirect back to dashboard.
  res.redirect('/');
});

/**
 *  This POST method take in an event _id and deletes it from the database.
 *
 *  @param {JSON Obj} req - Contains user-supplied data.
 *  @param {JSON Obj} res - Contains the response object for user.
 *  @param {Callback Arg} next - Callback argument for middleware functions.
 */
router.post('/delete-event', function(req, res, next) {
  // Init event _id.
  const { _id } = req.body;

  // Run query to delete specified event using the _id passed.
  Event.deleteOne({ _id: _id }, function (err) {
    if (err) return handleError(err);
  });

  // Redirect back to dashboard.
  res.redirect('/');
});

module.exports = router;
