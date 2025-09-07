import {StatusCodes} from 'http-status-codes';
import * as productService from '../services/productService.js';

export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProductService(
      req.body,
      req.file
    );
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message});
  }
};

export const updateProduct = async (req, res) => {
  try {
    const existingProduct = await productService.getProductService(
      req.params.id
    );

    if (!existingProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({message: 'Product does not exist'});
    }

    const product = await productService.updateProductService(
      req.params.id,
      req.body,
      req.file
    );

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message});
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const existingProduct = await productService.getProductService(
      req.params.id
    );

    if (!existingProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({message: 'Product does not exist'});
    }

    await productService.deleteProductService(req.params.id);

    res.status(StatusCodes.OK).json({message: 'Product deleted'});
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: error.message});
  }
};

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await productService.getProductsService(page, limit);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: error.message});
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductService(req.params.id);
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({message: error.message});
  }
};
