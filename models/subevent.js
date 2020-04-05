const mongoose = require('mongoose');

const SubEventSchema = new mongoose.Schema({
  EVENT_IDENTIFIER: { // Identifier created by MongoBD.
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  }
});

const SubEvent = mongoose.model('SubEvent', SubEventSchema);

module.exports = SubEvent;
