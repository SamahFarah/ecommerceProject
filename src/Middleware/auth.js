import jwt from 'jsonwebtoken';
import { AppError } from '../../AppError.js';
import userModel from '../../DB/models/user.model.js';

export const roles={
    Admin: "admin",
    User:"user",
    Delivery: "delivery",
}

export const auth= (accressRole= [])=>{
    return async (req,res,next)=>{
       
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
            return next(new AppError('You do not have Authentication', 403));
           }
            next();
        
       
    }
}
