const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; // Make sure JWT_SECRET is set in your .env file

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired at:', error.expiredAt);
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

