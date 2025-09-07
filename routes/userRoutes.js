import express from 'express';
import {updateUser} from '../controllers/userController.js';
import {protect} from '../middlewares/authMiddleware.js';
import {validate} from '../middlewares/validateMiddleware.js';
import {updateUserSchema} from '../validations/userValidation.js';

const router = express.Router();

router.patch('/update', protect, validate(updateUserSchema), updateUser);

export default router;
