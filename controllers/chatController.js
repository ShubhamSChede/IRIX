// controllers/chatController.js
const Message = require('../models/Message');
const User = require('../models/User');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id;  // Using your auth middleware

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (!text) {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const message = new Message({
      user: user.name,  // Use the user's name
      text: text
    });
    
    await message.save();
    
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};