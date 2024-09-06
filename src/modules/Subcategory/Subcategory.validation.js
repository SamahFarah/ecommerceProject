import Joi from 'joi';

export const createSubCategorySchema = {
  body: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Category name is required',
    }),
    image: Joi.string(),
    status: Joi.string().valid('active', 'not_active').default('not_active').messages({
      'any.only': 'Status must be either active or not_active',
    }),
    
  }),
  params: Joi.object({
    categoryId:Joi.string().length(24)
  })

  
};

export const getSubCategoryByIdSchema = {
    params:Joi.object({
        id:Joi.string().length(24)
    })
};
export const updateSubCategorySchema = {
    params: Joi.object({
      id: Joi.string().length(24).required().messages({
        'string.length': 'Subcategory ID must be a valid 24-character (ObjectId)',
        'string.empty': 'Subcategory ID is required',
      }),
    }),
    body: Joi.object({
      name: Joi.string().optional().messages({
        'string.empty': 'Subcategory name cannot be empty',
      }),
      status: Joi.string().valid('active', 'not_active').optional().messages({
        'any.only': 'Status must be either active or not_active',
      }),
      categoryId: Joi.string().length(24).optional().messages({
        'string.length': 'Category ID must be a valid 24-character (ObjectId)',
        'string.empty': 'Category ID cannot be empty',
      }),
    }),
  };
  

  export const updateSubCategoryImageSchema = {
    params:Joi.object({
        id:Joi.string().length(24)
    })
  };  

  export const deleteSubCategorySchema = {
    params:Joi.object({
        id:Joi.string().length(24)
    })
  }