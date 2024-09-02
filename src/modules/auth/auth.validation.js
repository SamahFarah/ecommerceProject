import joi from 'joi';
import { generalFeilds } from '../../Middleware/validation.js';
export const registerSchema = {
body:joi.object({
    username: joi.string().min(3).max(10).required().messages({
        'string.empty':'username is required',
        'string.max':'maximmum 10 letters of your username'
    }),
    email:generalFeilds.email,
   
    password: generalFeilds.password,
    image:joi.string().optional(),
    phone:joi.string().optional(),
    address:joi.string().optional(),
    confirmEmail:joi.boolean().default(false),
    gender:joi.valid('Male','Female').messages({
        'any.only':'gender must be one of [Male, Female]'
    }),
    status:joi.valid('active','not_active').default('not_active').messages({
        'any.only':'gender must be one of [active, not_active]'
    }),
    role:joi.valid('user','admin').default('user').messages({
        'any.only':'gender must be one of [user, admin]'
    })

})

};
export const loginSchema ={
 body:joi.object({
    
    email:generalFeilds.email,
    password: generalFeilds.password
    

})
};