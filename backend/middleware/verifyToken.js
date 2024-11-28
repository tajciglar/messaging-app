import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.id; 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
