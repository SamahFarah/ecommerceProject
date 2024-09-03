import jwt from 'jsonwebtoken';
import { AppError } from '../../AppError.js';
export const auth= (req,res,next)=>{
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
        req.id=decoded.id;
        req.role=decoded.role;
       
        next();
    }catch(error){
        return res.status(500).json({message: 'catch error', error:error.stack});
    }
   
}