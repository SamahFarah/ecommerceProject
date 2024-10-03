import Joi from 'joi';

export const createCouponSchema = {
  body: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Coupon name is required',
    }),
    amount: Joi.number().min(1).required().messages({
      'number.base': 'Amount must be a number',
      'number.min': 'Amount must be at least 1',
    }),
    expireDate: Joi.date().greater('now').required().messages({
      'date.base': 'Expire date must be a valid date',
      'date.greater': 'Expire date must be in the future',
    }),
  }),
};
