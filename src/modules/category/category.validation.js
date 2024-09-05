import Joi from 'joi';

export const createCategorySchema = {
  body: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Category name is required',
    }),
    image: Joi.string(),
    status: Joi.string().valid('active', 'not_active').default('not_active').messages({
      'any.only': 'Status must be either active or not_active',
    }),
    
  }),

  
};

export const getCategoryByIdSchema = {
    params:Joi.object({
        id:Joi.string().length(24)
    })
};


export const updateCategorySchema = {
  params: Joi.object({
    id: Joi.string().length(24).required().messages({
      'string.length': 'Category ID must be a valid 24-character (ObjectId)',
      'string.empty': 'Category ID is required',
    }),
  }),
  body: Joi.object({
    name: Joi.string().optional().messages({
      'string.empty': 'Category name cannot be empty',
    }),
    status: Joi.string().valid('active', 'not_active').optional().messages({
      'any.only': 'Status must be either active or not_active',
    }),
  }),
};
export const updateCategoryImageSchema = {
  params:Joi.object({
      id:Joi.string().length(24)
  })
};

export const deleteCategorySchema = {
  params:Joi.object({
      id:Joi.string().length(24)
  })
}