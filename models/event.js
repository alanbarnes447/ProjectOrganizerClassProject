const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  email: { // Identifier created by MongoBD.
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: false
  },
  allDay: {
    type: Boolean,
    required: true
  }
}, { versionKey: false });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
