import Joi from 'joi';

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow(''),
  price: Joi.number().positive().required(),
  discountPrice: Joi.number().positive().optional(),
  isFeatured: Joi.boolean().optional(),
  category: Joi.string().required(),
});

export const updateProductSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().positive().optional(),
  discountPrice: Joi.number().positive().optional(),
  isFeatured: Joi.boolean().optional(),
  category: Joi.string().optional(),
});
