// routes/chat.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/authMiddleware');  // Your existing auth middleware

router.get('/messages', auth, chatController.getMessages);
router.post('/messages', auth, chatController.createMessage);

module.exports = router;