import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().optional().max(50),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
});
