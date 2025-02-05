const express = require('express');
const router = express.Router();
const Sleep = require('../models/Sleep');

// Record sleep data
router.post('/:userId', async (req, res) => {
  try {
    const { date, hoursOfSleep } = req.body;
    
    const sleep = new Sleep({
      userId: req.params.userId,
      date: new Date(date),
      hoursOfSleep
    });

    await sleep.save();
    res.status(201).json(sleep);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Sleep entry already exists for this date' });
    }
    res.status(500).json({ error: 'Failed to record sleep data' });
  }
});

// Get sleep records with optional date range
router.get('/:userId', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { userId: req.params.userId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sleepRecords = await Sleep.find(query).sort({ date: -1 });
    res.json(sleepRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sleep records' });
  }
});

// Delete sleep record
router.delete('/:userId/:sleepId', async (req, res) => {
  try {
    await Sleep.findByIdAndDelete(req.params.sleepId);
    res.json({ message: 'Sleep record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sleep record' });
  }
});

module.exports = router;