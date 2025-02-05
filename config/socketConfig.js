// 4. config/socketConfig.js
const chatController = require('../controllers/chatController');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendMessage', async ({ user, text }) => {
      try {
        // Save message to database
        await chatController.saveMessage({ user, text });
        
        // Broadcast message to all connected users
        io.emit('message', { user, text });
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupSocket;