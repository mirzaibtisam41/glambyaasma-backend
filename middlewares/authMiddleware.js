import jwt from 'jsonwebtoken';
import User from '../models/user';
import {StatusCodes} from 'http-status-codes';

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({message: 'Not authorized, token missing'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({message: 'User not found'});
    }

    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({message: 'Not authorized, token failed'});
  }
};
