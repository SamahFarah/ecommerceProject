import userModel from "../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from "../../../AppError.js";
import cloudinary from "../../Utils/cloudinary.js";
import { sendEmail } from "../../Utils/sendEmail.js";
export const Register = async (req, res, next) => {
    const { username, email, password,role } = req.body;
    const user = await userModel.findOne({ email });
  
    if (user) {
      return next(new AppError('email exist', 409));
    }
  
    const passwordHashed = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const html = `
    <div>
        <p style="color: #555; font-size: 16px;"> Dear: ${username} </p>
        <h1 style="color: #4A90E2; font-size: 32px;">Welcome to ecommerce!</h1>
        <p style="color: #555; font-size: 16px;">Thank you for registering with us.</p>
    </div>
`

       sendEmail(email,"Welcom! ✔ ",html)
  
    let image = '';    //default value.
    
     
    if (req.file) {
      try {
        const { secure_url } = await cloudinary.uploader.upload(req.file.path);
        image = secure_url;  
      } catch (error) {
        return next(new AppError('Image upload failed', 500));
      }
    }
  
    
    await userModel.create({ username, email, password: passwordHashed, image,role});
  
    return res.status(201).json({ message: "success" });
  };
  


export const Login = async(req,res,next)=>{
        
    const {email,password}=req.body;
    
    const user= await userModel.findOne({email});
    if(!user){
       // return res.status(404).json({message:"email not found"})
       return next(new AppError('email not found',404));
    }
    const match =  bcrypt.compareSync(password,user.password);
    if(!match){
       // return res.status(404).json({message:"invalid password"})
       return next(new AppError('invalid password',409));

    }
    const token= jwt.sign(
        {id:user._id,role:user.role},process.env.LOGINTOKEN,
        {expiresIn:'10d'}
    );
    return res.status(200).json({message:"success",token})

}

