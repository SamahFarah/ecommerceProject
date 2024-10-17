import userModel from "../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from "../../../AppError.js";
import cloudinary from "../../Utils/cloudinary.js";
import { sendEmail } from "../../Utils/sendEmail.js";
import { customAlphabet } from "nanoid";



export const Register = async (req, res, next) => {
    const { username, email, password,role } = req.body;
    const user = await userModel.findOne({ email });
  
    if (user) {
      return next(new AppError('email exist', 409));
    }
  
    const passwordHashed = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
   
  
    let image = '';    //default value.
    
     
    if (req.file) {
      try {
        const { secure_url } = await cloudinary.uploader.upload(req.file.path);
        image = secure_url;  
      } catch (error) {
        return next(new AppError('Image upload failed', 500));
      }
    }
  
    
   const creatUser= await userModel.create({ username, email, password: passwordHashed, image,role});
    const token= jwt.sign({email},process.env.CONFIRMEMAILTOKEN);
    await sendEmail(email,`confirm email from ecommerce website`,username,token)
    return res.status(201).json({ message: "success",creatUser});
  };
  
export const confirmEmail = async (req,res)=>{
  const {token}=req.params;
  const decoded= jwt.verify(token,process.env.CONFIRMEMAILTOKEN);
  //console.log("Decoded token:", decoded);
  await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
  return res.status(200).json({message:"success"});
}

export const Login = async(req,res,next)=>{
        
    const {email,password}=req.body;
    
    const user= await userModel.findOne({email});
    if(!user){
       // return res.status(404).json({message:"email not found"})
       return next(new AppError('email not found',404));
    }
    if(!user.confirmEmail){
      return next(new AppError('please confirm your Email',409));

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

export const sendCode = async(req,res,next)=>{
const {email}= req.body;
const code= customAlphabet('1234567890',4)();
const user= await userModel.findOneAndUpdate({email},{
  sendCode:code
}
,{
  new:true
});
if (!user) {
  return next(new AppError('email not found', 409));
}
const html = `<h2> code is : ${code} </h2>`
await sendEmail(email,'reset password',html);
return res.status(200).json({message:"success"})

}

export const forgotpassword = async(req,res,next)=>{
  const {email,password,code}=req.body;

  const user= await userModel.findOne({email});
  if(!user){
    return next(new AppError('email not found', 409));

  }

  if(user.sendCode != code){
    return next(new AppError('invalid code', 409));

  }
  user.password= bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
  user.sendCode=null;
  await user.save();
  return res.status(200).json({message:"success"});

}