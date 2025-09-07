import express from 'express';
import multer from 'multer';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import {protect} from '../middlewares/authMiddleware.js';
import {validate} from '../middlewares/validateMiddleware.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validations/product.js';

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

router
  .route('/')
  .get(getProducts)
  .post(
    protect,
    upload.single('image'),
    validate(createProductSchema),
    createProduct
  );

router
  .route('/:id')
  .get(protect, getProduct)
  .patch(
    protect,
    upload.single('image'),
    validate(updateProductSchema),
    updateProduct
  )
  .delete(protect, deleteProduct);

export default router;
