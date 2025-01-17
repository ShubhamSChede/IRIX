const express = require('express');
const router = express.Router();
const { addWorkout, getWorkouts, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addWorkout);
router.get('/', auth, getWorkouts);
router.put('/:id', auth, updateWorkout);
router.delete('/:id', auth, deleteWorkout);

module.exports = router;