const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  email: { // Identifier used for determining which user added the event.
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  allDay: {
    type: Boolean,
    required: true
  }
}, { versionKey: false });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
