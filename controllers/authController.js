import {StatusCodes} from 'http-status-codes';
import {registerService, loginService} from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const {email, password, name, role} = req.body;
    const user = await registerService({email, password, name, role});

    res.status(StatusCodes.CREATED).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message});
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const {user, token} = await loginService(email, password);

    res
      .status(StatusCodes.OK)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      })
      .json({message: 'Login successful', user});
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({message: error.message});
  }
};
