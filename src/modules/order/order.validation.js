import Joi from 'joi';

export const createOrderSchema = Joi.object({

    couponName: Joi.string().optional().messages({
      'string.empty': 'Coupon name cannot be empty',
    }),
    address: Joi.string().min(3).optional().messages({
      'string.empty': 'Address cannot be empty',
      'string.min': 'Address must be at least 3 characters long',
    }),
    phone: Joi.string().pattern(/^(056|059)\d{7}$/).optional().messages({
      'string.pattern.base': 'Phone number must start with 056 or 059 and be followed by 7 digits',
      'string.empty': 'Phone number cannot be empty',
    }),
  });



export const updateOrderStatusSchema = Joi.object({

    orderId: Joi.string().length(24).required().messages({
      'string.length': 'Order ID must be a valid 24-character (ObjectId)',
      'string.empty': 'Order ID is required',
    }),
  

    newStatus: Joi.string().valid('pending', 'confirmed', 'cancelled').required().messages({
      'any.only': 'Status must be one of: pending, confirmed, cancelled',
      'string.empty': 'Status is required',
    }),
  });
  

export const updateDeliveryStatusSchema = Joi.object({
 
    orderId: Joi.string().length(24).required().messages({
      'string.length': 'Order ID must be a valid 24-character (ObjectId)',
      'string.empty': 'Order ID is required',
    }),

 
    newStatus: Joi.string().valid('onWay', 'delivered', 'rejected').required().messages({
      'any.only': 'New status must be either onWay, delivered, or rejected',
      'string.empty': 'New status is required',
    }),
  });


