import Joi from 'joi';


export const createProductSchema = Joi.object({

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
    mainImage: Joi.array().items({
     
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/gif', 'image/JFIF').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5000000).required() // الحجم الأقصى 5 ميجابايت
      }).required(),
    
    subImages: Joi.array().items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/gif', 'image/JFIF').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5000000).required() // الحجم الأقصى 5 ميجابايت
      })
    ).max(5).optional(),
    colors: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'Colors must be an array of strings',
    }),
    sizes: Joi.array().items(Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL')).optional().messages({
      'array.base': 'Sizes must be an array of strings',
      'any.only': 'Sizes must be one of the following values: XS, S, M, L, XL, XXL',
    }),
    
    discount:Joi.number().positive().integer().optional(),
  });



export const getProductsSchema = Joi.object({

    categoryId: Joi.string().length(24).required().messages({
      'string.length': 'Category ID must be a valid 24-character ID',
      'any.required': 'Category ID is required',
    }),
    subcategoryId: Joi.string().length(24).required().messages({
      'string.length': 'Subcategory ID must be a valid 24-character ID',
      'any.required': 'Subcategory ID is required',
    }),
  });


export const getProductsByIdSchema = Joi.object({

    productId: Joi.string().length(24).required().messages({
      'string.length': 'Category ID must be a valid 24-character ID',
      'any.required': 'Category ID is required',
    }),
  });

export const deletetProductSchema = Joi.object({

    productId: Joi.string().length(24).required().messages({
      'string.length': 'Category ID must be a valid 24-character ID',
      'any.required': 'Category ID is required',
    }),
  });