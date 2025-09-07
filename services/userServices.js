import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const updateUserService = async (userId, data) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(data.password, salt);
    }

    if (data.name) user.name = data.name;

    await user.save();
    return user;
  } catch (error) {
    throw new Error(`User update failed: ${error.message || error}`);
  }
};
