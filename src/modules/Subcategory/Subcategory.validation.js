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
    slug: Joi.string().optional(),
    
  }),
  params: Joi.object({
    categoryId:Joi.string().length(24)
  })

  
};

export const getSubCategoryByIdSchema = {
  params: Joi.object({
      categoryId: Joi.string().length(24).required(), 
      subcategoryId: Joi.string().length(24).required() 
  })
};

export const updateSubCategorySchema = {
  params: Joi.object({
      categoryId: Joi.string().length(24).required().messages({
          'string.length': 'Category ID must be a valid 24-character ObjectId',
          'string.empty': 'Category ID is required'
      }),
      subcategoryId: Joi.string().length(24).required().messages({
          'string.length': 'Subcategory ID must be a valid 24-character ObjectId',
          'string.empty': 'Subcategory ID is required'
      })
  }),
  body: Joi.object({
      name: Joi.string().optional().messages({
          'string.empty': 'Subcategory name cannot be empty'
      }),
      slug: Joi.string().optional(),
      status: Joi.string().valid('active', 'not_active').optional().messages({
          'any.only': 'Status must be either active or not_active'
      }),
      newCategoryId: Joi.string().length(24).optional().messages({
          'string.length': 'New Category ID must be a valid 24-character ObjectId',
          'string.empty': 'New Category ID cannot be empty'
      }),
  }),
};

  

export const updateSubCategoryImageSchema = {
  params: Joi.object({
      categoryId: Joi.string().length(24).required().messages({
          'string.length': 'Category ID must be a valid 24-character ObjectId',
          'string.empty': 'Category ID is required'
      }),
      subcategoryId: Joi.string().length(24).required().messages({
          'string.length': 'Subcategory ID must be a valid 24-character ObjectId',
          'string.empty': 'Subcategory ID is required'
      })
  })
};


  export const deleteSubCategorySchema = {
    params: Joi.object({
      categoryId: Joi.string().length(24).required().messages({
          'string.length': 'Category ID must be a valid 24-character ObjectId',
          'string.empty': 'Category ID is required'
      }),
      subcategoryId: Joi.string().length(24).required().messages({
          'string.length': 'Subcategory ID must be a valid 24-character ObjectId',
          'string.empty': 'Subcategory ID is required'
      })
  })
};