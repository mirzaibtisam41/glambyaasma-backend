import slugify from 'slugify';
import Category from '../models/Category.js';

export const createCategoryService = async (name) => {
  try {
    const category = await Category.create({name, slug: slugify(name)});
    return category;
  } catch (error) {
    throw new Error(`Create category failed: ${error.message}`);
  }
};

export const getCategoriesService = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new Error(`Get categories failed: ${error.message}`);
  }
};

export const getCategoryByIdService = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) return null;
    return category;
  } catch (error) {
    throw new Error(`Get category failed: ${error.message}`);
  }
};

export const updateCategoryService = async (id, name) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {name, slug: slugify(name)},
      {new: true}
    );
    return category;
  } catch (error) {
    throw new Error(`Update category failed: ${error.message}`);
  }
};

export const deleteCategoryService = async (id) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    return category;
  } catch (error) {
    throw new Error(`Delete category failed: ${error.message}`);
  }
};
