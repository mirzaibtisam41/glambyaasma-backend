import cloudinary from '../config/cloudinary.js';
import Product from '../models/Product.js';

export const uploadImage = async (fileBuffer, folder) => {
  try {
    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {folder},
        (error, result) => {
          if (error) {
            return reject(new Error(error.message || JSON.stringify(error)));
          }
          resolve(result.secure_url);
        }
      );
      stream.end(fileBuffer);
    });
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message || error}`);
  }
};

export const createProductService = async (data, file) => {
  try {
    let imageUrl;
    if (file) imageUrl = await uploadImage(file.buffer, 'products');

    const product = await Product.create({...data, image: imageUrl});
    return product;
  } catch (error) {
    throw new Error(`Create product failed: ${error.message}`);
  }
};

export const updateProductService = async (id, data, file) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    if (file) {
      if (product.image) {
        const publicId = product.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`products/${publicId}`, {
          resource_type: 'image',
        });
      }
      const imageUrl = await uploadImage(file.buffer, 'products');
      data.image = imageUrl;
    }

    Object.assign(product, data);
    await product.save();
    return product;
  } catch (error) {
    throw new Error(`Update product failed: ${error.message}`);
  }
};

export const deleteProductService = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    if (product.image) {
      const publicId = product.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`products/${publicId}`, {
        resource_type: 'image',
      });
    }

    return await await Product.findByIdAndDelete(id).exec();
  } catch (error) {
    throw new Error(`Delete product failed: ${error.message}`);
  }
};

export const getProductsService = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments();
    const products = await Product.find().populate('category');
    // .skip(skip)
    // .limit(limit);
    return {total, page, pages: Math.ceil(total / limit), products};
  } catch (error) {
    throw new Error(`Get products failed: ${error.message}`);
  }
};

export const getProductService = async (id) => {
  try {
    const product = await Product.findById(id).populate('category');
    if (!product) throw new Error('Product not found');
    return product;
  } catch (error) {
    throw new Error(`Get product failed: ${error.message}`);
  }
};
