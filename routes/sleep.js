const express = require('express');
const router = express.Router();
const Sleep = require('../models/Sleep');
const auth = require('../middleware/authMiddleware');

// Record sleep data
router.post('/', auth, async (req, res) => {
  try {
    const { date, hoursOfSleep } = req.body;
    
    // Create new sleep record
    const sleep = new Sleep({
      userId: req.user.id,
      date: new Date(date),
      hoursOfSleep
    });

    await sleep.save();
    res.json(sleep);
  } catch (error) {
    // Handle duplicate entry error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Sleep entry already exists for this date' });
    }
    res.status(500).json({ error: 'Failed to record sleep data' });
  }
});

// Get sleep records
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { userId: req.user.id };

    // Add date range to query if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sleepRecords = await Sleep.find(query)
      .sort({ date: -1 });
    
    res.json(sleepRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sleep records' });
  }
});

// Get single sleep record by date
router.get('/:date', auth, async (req, res) => {
  try {
    const startOfDay = new Date(req.params.date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(req.params.date);
    endOfDay.setHours(23, 59, 59, 999);

    const sleep = await Sleep.findOne({
      userId: req.user.id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (!sleep) {
      return res.status(404).json({ error: 'Sleep record not found' });
    }

    res.json(sleep);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sleep record' });
  }
});

// Update sleep record
router.put('/:date', auth, async (req, res) => {
  try {
    const { hoursOfSleep } = req.body;
    const startOfDay = new Date(req.params.date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(req.params.date);
    endOfDay.setHours(23, 59, 59, 999);

    const sleep = await Sleep.findOneAndUpdate(
      {
        userId: req.user.id,
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      },
      { hoursOfSleep },
      { new: true }
    );

    if (!sleep) {
      return res.status(404).json({ error: 'Sleep record not found' });
    }

    res.json(sleep);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sleep record' });
  }
});

module.exports = router;