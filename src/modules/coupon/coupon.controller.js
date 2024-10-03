import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../../AppError.js";
import couponModel from "../../../DB/models/coupon.model.js";

export const createCoupon = async (req, res, next) => {
    if(await couponModel.findOne({name:req.body.name})){
        return next(new AppError(`coupon name already exist `, 409));

    }
    req.body.expireDate = new Date(req.body.expireDate);
    req.body.createdBy= req.id;
    req.body.updatedBy= req.id;

const coupon = await couponModel.create(req.body);
return res.status(201).json({message:"success",coupon})
};

//get coupons for admins .

