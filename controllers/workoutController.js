// const Workout = require('../models/Workout');

// exports.addWorkout = async (req, res) => {
//   try {
//     const { date, steps, exercises } = req.body;
//     const workout = new Workout({
//       user: req.user.id,
//       date,
//       steps,
//       exercises
//     });

//     await workout.save();
//     res.json(workout);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

// exports.getWorkouts = async (req, res) => {
//   try {
//     const workouts = await Workout.find({ user: req.user.id });
//     res.json(workouts);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

// exports.updateWorkout = async (req, res) => {
//   try {
//     const workout = await Workout.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id },
//       { $set: req.body },
//       { new: true }
//     );
    
//     if (!workout) {
//       return res.status(404).json({ message: 'Workout not found' });
//     }
    
//     res.json(workout);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

// exports.deleteWorkout = async (req, res) => {
//   try {
//     const workout = await Workout.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user.id
//     });
    
//     if (!workout) {
//       return res.status(404).json({ message: 'Workout not found' });
//     }
    
//     res.json({ message: 'Workout deleted' });
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };



const Workout = require('../models/Workout');

exports.addWorkout = async (req, res) => {
  try {
    const userId = req.header('user-id');
    const { date, steps, exercises } = req.body;
    
    const workout = new Workout({
      user: userId,
      date,
      steps,
      exercises
    });

    await workout.save();
    res.json(workout);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const userId = req.header('user-id');
    const workouts = await Workout.find({ user: userId });
    res.json(workouts);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const userId = req.header('user-id');
    const workoutId = req.params.id;
    
    const workout = await Workout.findOneAndUpdate(
      { _id: workoutId, user: userId },
      { $set: req.body },
      { new: true }
    );
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    res.json(workout);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const userId = req.header('user-id');
    const workoutId = req.params.id;
    
    const workout = await Workout.findOneAndDelete({
      _id: workoutId,
      user: userId
    });
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};