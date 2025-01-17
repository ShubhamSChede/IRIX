const auth = (req, res, next) => {
    const userId = req.header('user-id');
  
    if (!userId) {
      return res.status(401).json({ message: 'No user ID provided' });
    }
  
    req.user = { id: userId };
    next();
  };
  
  module.exports = auth;