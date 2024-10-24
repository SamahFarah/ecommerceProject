import Joi from 'joi';

export const createReviewSchema =   Joi.object({

    productId: Joi.string().length(24).required().messages({
      'string.length': 'Product ID must be a valid 24-character (ObjectId)',
      'string.empty': 'Product ID is required',
    }),
  
    comment: Joi.string().required().messages({
      'string.empty': 'Comment cannot be empty',
    }),
 
    rating: Joi.number().min(1).max(5).required().messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot be more than 5',
      'any.required': 'Rating is required',
    }),
  });
  

