const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; // Make sure JWT_SECRET is set in your .env file

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret); // Verify token
    req.userId = decoded.id; // Store user ID in the request object for later use
    next(); // Pass control to the next middleware/route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
