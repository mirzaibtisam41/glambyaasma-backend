import {StatusCodes} from 'http-status-codes';
import * as categoryService from '../services/categoryService.js';

export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategoryService(req.body.name);
    res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message});
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategoriesService();
    res.status(StatusCodes.OK).json({categories});
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: error.message});
  }
};

export const updateCategory = async (req, res) => {
  try {
    const existingCategory = await categoryService.getCategoryByIdService(
      req.params.id
    );

    if (!existingCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({message: 'Category does not exist'});
    }

    const category = await categoryService.updateCategoryService(
      req.params.id,
      req.body.name
    );

    res.status(StatusCodes.OK).json({category});
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message});
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const existingCategory = await categoryService.getCategoryByIdService(
      req.params.id
    );

    if (!existingCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({message: 'Category does not exist'});
    }

    const category = await categoryService.deleteCategoryService(req.params.id);

    res.status(StatusCodes.OK).json({category, message: 'Category deleted'});
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: error.message});
  }
};
