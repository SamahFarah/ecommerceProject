import joi from 'joi';

const dataMethods = ['body', 'query', 'params'];

export const generalFeilds={
    email:joi.string().email().required().messages({
        'string.email':'email is requires in this form : youremail@gmail.com',
        'string.empty':'email is required'
    }),
    password: joi.string().min(6).required().messages({
         'string.empty':'password is required',
         'string.min':'password must be at least 6 digits'
    })
}



const validation = (schema) => {
  return (req, res, next) => {
    const validationArray = [];

    dataMethods.forEach(key => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], { abortEarly: false });
        if (validationResult.error) {
          validationArray.push(validationResult.error.details);
        }
      }
    });

    if (validationArray.length > 0) {
      return res.status(400).json({ message: "validation error", validationErrors: validationArray });
    } else {
      next();
    }
  };
}

export default validation;