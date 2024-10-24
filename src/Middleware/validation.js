import joi from 'joi';


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
    const errorMessage = [];
    
    
    let filterData = { ...req.body, ...req.params, ...req.query };
    if(req.file){
      filterData.image=req.file;
    }
    // التعامل مع رفع الصور من خلال fields
    if (req.files) {
      // إذا كانت mainImage موجودة
      if (req.files.mainImage && req.files.mainImage.length > 0) {
        filterData.mainImage = req.files.mainImage[0]; 
      } else {
      
        return res.status(400).json({ message: "mainImage is required" });
      }
      
      // التعامل مع subImages
      if (req.files.subImages) {
        filterData.subImages = req.files.subImages; 
      }
    }

    
    const { error } = schema.validate(filterData, { abortEarly: false });
    
    if (error) {
      error.details.forEach(err => {
        const key = err.context.key;
        errorMessage.push({ [key]: err.message });
      });
      return res.status(400).json({ message: "validation error", errors: errorMessage });
    }

    next();
  };
};


export default validation;