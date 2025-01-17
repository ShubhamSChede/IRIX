const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Create/Update profile
router.post('/:userId', async (req, res) => {
  try {
    const { age, gender, height, weight } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      { age, gender, height, weight },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get profile
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;