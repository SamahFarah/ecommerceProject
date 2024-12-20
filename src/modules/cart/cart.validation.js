import Joi from 'joi';

export const addToCartSchema =  Joi.object({
  
    products: Joi.array().items(
      Joi.object({
        productId: Joi.string().length(24).required().messages({
          'string.length': 'Product ID must be a valid 24-character (ObjectId)',
          'string.empty': 'Product ID is required',
        }),
        quantity: Joi.number().min(1).default(1).messages({
          'number.base': 'Quantity must be a number',
          'number.min': 'Quantity must be at least 1',
        }),
      })
    )
  });



export const removeItemSchema = Joi.object({

    productId: Joi.string().length(24).required().messages({
      'string.length': 'Product ID must be a valid 24-character (ObjectId)',
      'string.empty': 'Product ID is required',
      'any.required': 'Product ID is required'
    })
  });


/*export const increaseQuantitySchema = {
  params: Joi.object({
    productId: Joi.string().length(24).required().messages({
      'string.length': 'Product ID must be a valid 24-character (ObjectId)',
      'string.empty': 'Product ID is required',
      'any.required': 'Product ID is required'
    })
  }),
 body: Joi.object({
  quantity: Joi.number().min(1).default(0).messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1',
  }),
  })
  
};*/

/*export const decreaseQuantitySchema = {
  params: Joi.object({
    productId: Joi.string().length(24).required().messages({
      'string.length': 'Product ID must be a valid 24-character (ObjectId)',
      'string.empty': 'Product ID is required',
      'any.required': 'Product ID is required'
    })
  }),
 body: Joi.object({
  quantity: Joi.number().min(1).default(0).messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1',
  }),
  })
  
};*/

export const updateQuantitySchema = Joi.object({
   
    productId: Joi.string().length(24).required().messages({
      'string.length': 'Product ID must be a valid 24-character (ObjectId)',
      'string.empty': 'Product ID is required',
      'any.required': 'Product ID is required',
    }),
    quantity: Joi.number().min(1).required().messages({
      'number.base': 'Quantity must be a number',
      'number.min': 'Quantity must be at least 1',
      'any.required': 'Quantity is required',
    }),
    operator: Joi.string().valid('+', '-').required().messages({
      'any.only': 'Operator must be either "+" or "-"',
      'any.required': 'Operator is required',
    }),
  });
