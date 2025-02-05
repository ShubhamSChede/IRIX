const auth = (req, res, next) => {
  // Check body first, then query parameters
  const userId = req.body['user-id'] || req.query['user-id'];

  if (!userId) {
    return res.status(401).json({ message: 'No user ID provided' });
  }

  req.user = { id: userId };
  next();
};

module.exports = auth;