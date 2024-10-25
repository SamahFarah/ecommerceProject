import Joi from 'joi';
import { generalFeilds } from '../../Middleware/validation.js';


export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(10).required().messages({
        'string.empty':'username is required',
        'string.max':'maximmum 10 letters of your username'
    }),
    email:generalFeilds.email,
   
    password: generalFeilds.password,
    cpassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match password',
        'any.required': 'Confirm password is required',
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
    }).optional(),
    phone:Joi.string().optional(),
    address:Joi.string().optional(),
    confirmEmail:Joi.boolean().default(false),
    gender:Joi.valid('Male','Female').messages({
        'any.only':'gender must be one of [Male, Female]'
    }),
    status:Joi.valid('active','not_active').default('not_active').messages({
        'any.only':'gender must be one of [active, not_active]'
    }),
    role:Joi.valid('user','admin').default('user').messages({
        'any.only':'gender must be one of [user, admin]'
    })

});




export const loginSchema =Joi.object({    
    email:generalFeilds.email,
    password: generalFeilds.password
    

});



export const sendCodeSchema=Joi.object({

      email: generalFeilds.email
    });
 



  export const forgotPasswordSchema =Joi.object({

      email: generalFeilds.email,
      password: generalFeilds.password,
      cpassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match password',
        'any.required': 'Confirm password is required',
      }),
      code: Joi.string().length(4).required().messages({
        'string.empty': 'Code is required',
        'string.length': 'Code must be 4 digits',
      }),
    });
 
  
  