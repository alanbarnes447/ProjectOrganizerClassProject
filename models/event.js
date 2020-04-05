const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  USER_IDENTIFIER: { // Identifier created by MongoBD.
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
