import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerService = async (data) => {
  try {
    const existing = await User.findOne({email: data.email});
    if (existing) throw new Error('Email already exists');

    const user = await User.create(data);
    return user;
  } catch (error) {
    throw new Error(`User registration failed: ${error.message || error}`);
  }
};

export const loginService = async (email, password) => {
  try {
    const user = await User.findOne({email});
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    );

    return {user, token};
  } catch (error) {
    throw new Error(`Login failed: ${error.message || error}`);
  }
};
