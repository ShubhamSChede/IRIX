const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  hoursOfSleep: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Compound index to prevent duplicate entries for the same date and user
SleepSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Sleep', SleepSchema);