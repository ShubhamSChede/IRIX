const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  type: String,
  duration: Number,
  exercise_name: String,
  calories: Number,
  note: String
});

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  steps: Number,
  exercises: [exerciseSchema]
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);