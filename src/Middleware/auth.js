import jwt from 'jsonwebtoken';
import { AppError } from '../../AppError.js';
import userModel from '../../DB/models/user.model.js';

export const roles={
    Admin: "admin",
    User:"user",
}

export const auth= (accressRole= [])=>{
    return async (req,res,next)=>{
        try{
            const {authorization} = req.headers;
            if(!authorization?.startsWith(process.env.BERERTOKEN)){
                //return res.status(400).json ({message: "invalid token"});
                return next(new AppError('invalid token',400));
            }
            const token=authorization.split(process.env.BERERTOKEN)[1];
            const decoded = jwt.verify(token,process.env.LOGINTOKEN) ;
            if(!decoded) {
           // return res.status(400).json ({message: "invalid token"});
           return next(new AppError('invalid token',400));
    
           }
           const user= await userModel.findById(decoded.id).select("username role");
            req.id=user._id;
           if(!accressRole.includes(user.role)){
            return next(new AppError('You do not have Authentication on the  category ', 403));
           }
            next();
        }catch(error){
            return res.status(500).json({message: 'catch error', error:error.stack});
        }
       
    }
}
