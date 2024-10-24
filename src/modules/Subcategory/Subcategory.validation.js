import Joi from 'joi';

export const createSubCategorySchema =  Joi.object({

    name: Joi.string().required().messages({
      'string.empty': 'Category name is required',
    }),
    image: Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid('image/png','image/jpeg','image/gif','image/JFIF').required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
      size: Joi.number().max(5000000).required() // الحجم الأقصى 5 ميجابايت
    }).required(),
        status: Joi.string().valid('active', 'not_active').default('not_active').messages({
      'any.only': 'Status must be either active or not_active',
    }),
    slug: Joi.string().optional(),
    categoryId:Joi.string().length(24)

    
  });
 


  


export const getSubCategoryByIdSchema =   Joi.object({

      categoryId: Joi.string().length(24).required(), 
      subcategoryId: Joi.string().length(24).required() 
  });


export const updateSubCategorySchema = Joi.object({

      categoryId: Joi.string().length(24).required().messages({
          'string.length': 'Category ID must be a valid 24-character ObjectId',
          'string.empty': 'Category ID is required'
      }),
      subcategoryId: Joi.string().length(24).required().messages({
          'string.length': 'Subcategory ID must be a valid 24-character ObjectId',
          'string.empty': 'Subcategory ID is required'
      }),
 
 
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
    });

  
export const updateSubCategoryImageSchema = Joi.object({

      categoryId: Joi.string().length(24).required().messages({
          'string.length': 'Category ID must be a valid 24-character ObjectId',
          'string.empty': 'Category ID is required'
      }),
      subcategoryId: Joi.string().length(24).required().messages({
          'string.length': 'Subcategory ID must be a valid 24-character ObjectId',
          'string.empty': 'Subcategory ID is required'
      }),
      image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png','image/jpeg','image/gif','image/JFIF').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5000000).required() // الحجم الأقصى 5 ميجابايت
      }).required(),
  });



  export const deleteSubCategorySchema =  Joi.object({

      categoryId: Joi.string().length(24).required().messages({
          'string.length': 'Category ID must be a valid 24-character ObjectId',
          'string.empty': 'Category ID is required'
      }),
      subcategoryId: Joi.string().length(24).required().messages({
          'string.length': 'Subcategory ID must be a valid 24-character ObjectId',
          'string.empty': 'Subcategory ID is required'
      }),
  });
