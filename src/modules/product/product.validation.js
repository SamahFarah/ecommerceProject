import Joi from 'joi';


export const createProductSchema = {
  body: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Product name is required',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Product description is required',
    }),
   
    price: Joi.number().required().min(0).messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price must be a positive value',
      'any.required': 'Price is required',
    }),
    stock: Joi.number().required().min(0).messages({
      'number.base': 'Stock must be a number',
      'number.min': 'Stock must be a positive value',
      'any.required': 'Stock is required',
    }),
    category: Joi.string().length(24).required().messages({
      'string.length': 'Category ID must be a valid 24-character ID',
      'any.required': 'Category is required',
    }),
    subcategory: Joi.string().length(24).required().messages({
      'string.length': 'Subcategory ID must be a valid 24-character ID',
      'any.required': 'Subcategory is required',
    }),
    colors: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'Colors must be an array of strings',
    }),
    sizes: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'Sizes must be an array of strings',
    }),
  }),
};


export const getProductsSchema = {
  params: Joi.object({
    categoryId: Joi.string().length(24).required().messages({
      'string.length': 'Category ID must be a valid 24-character ID',
      'any.required': 'Category ID is required',
    }),
    subcategoryId: Joi.string().length(24).required().messages({
      'string.length': 'Subcategory ID must be a valid 24-character ID',
      'any.required': 'Subcategory ID is required',
    }),
  }),
};

export const getProductsByIdSchema = {
  params: Joi.object({
    productId: Joi.string().length(24).required().messages({
      'string.length': 'Category ID must be a valid 24-character ID',
      'any.required': 'Category ID is required',
    }),
  })
  
};

export const deletetProductSchema = {
  params: Joi.object({
    productId: Joi.string().length(24).required().messages({
      'string.length': 'Category ID must be a valid 24-character ID',
      'any.required': 'Category ID is required',
    }),
  })
  
};