import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    const error = new Error('Not authorized');
    error.statusCode = 401;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      throw error;
    }

    next();
  } catch (err) {
    const error = new Error('Not authorized');
    error.statusCode = 401;
    throw error;
  }
});

const authorizeRoles = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user?.role)) {
    const error = new Error('Forbidden');
    error.statusCode = 403;
    throw error;
  }

  next();
};

export { protect, authorizeRoles };
