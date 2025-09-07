import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/categoryController.js';
import {protect} from '../middlewares/authMiddleware.js';
import {validate} from '../middlewares/validateMiddleware.js';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../validations/categoryValidation.js';

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(protect, validate(createCategorySchema), createCategory);

router
  .route('/:id')
  .patch(protect, validate(updateCategorySchema), updateCategory)
  .delete(protect, deleteCategory);

export default router;
