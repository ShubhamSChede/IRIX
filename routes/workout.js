const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Add workout
router.post('/:userId', async (req, res) => {
  try {
    const { date, steps, exercises } = req.body;
    const workout = new Workout({
      userId: req.params.userId,
      date,
      steps,
      exercises
    });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add workout' });
  }
});

// Get workouts
router.get('/:userId', async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Delete workout
router.delete('/:workoutId', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.workoutId);
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

module.exports = router;