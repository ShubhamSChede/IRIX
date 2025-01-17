const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  exercise_name: {
    type: String,
    required: true
  },
  calories: Number,
  note: String
});

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  steps: {
    type: Number,
    required: true
  },
  exercises: [exerciseSchema]
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);