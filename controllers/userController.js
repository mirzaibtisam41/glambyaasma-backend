import {StatusCodes} from 'http-status-codes';
import {updateUserService} from '../services/userServices.js';

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserService(req.user._id, req.body);
    res
      .status(StatusCodes.OK)
      .json({message: 'User updated successfully', user: updatedUser});
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message});
  }
};
