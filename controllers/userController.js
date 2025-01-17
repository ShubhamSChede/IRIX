const User = require('../models/User');

exports.updatePersonalDetails = async (req, res) => {
  try {
    const { age, gender, height, weight } = req.body;
    const userId = req.params.userId;  // Get userId from URL parameter
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.personalDetails = { age, gender, height, weight };
    await user.save();

    res.json(user.personalDetails);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getPersonalDetails = async (req, res) => {
  try {
    const userId = req.params.userId;  // Get userId from URL parameter
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.personalDetails);
  } catch (err) {
    res.status(500).send('Server error');
  }
};