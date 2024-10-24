import Joi from 'joi';

export const createCategorySchema = Joi.object({
 
    name: Joi.string().required().messages({
      'string.empty': 'Category name is required',
    }),
    status: Joi.string().valid('active', 'not_active').default('not_active').messages({
      'any.only': 'Status must be either active or not_active',
    }),
    // Optional slug field in case it's passed, though it's generated automatically
    slug: Joi.string().optional(),
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


export const getCategoryByIdSchema =  Joi.object({
 
        id:Joi.string().length(24)
    });



export const updateCategorySchema =   Joi.object({

    id: Joi.string().length(24).required().messages({
      'string.length': 'Category ID must be a valid 24-character (ObjectId)',
      'string.empty': 'Category ID is required',
    }),

 
    name: Joi.string().optional().messages({
      'string.empty': 'Category name cannot be empty',
    }),
    slug: Joi.string().optional(),
    status: Joi.string().valid('active', 'not_active').optional().messages({
      'any.only': 'Status must be either active or not_active',
    }),
  });

export const updateCategoryImageSchema = Joi.object({
      id:Joi.string().length(24),
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


export const deleteCategorySchema = Joi.object({
      id:Joi.string().length(24)
  });
