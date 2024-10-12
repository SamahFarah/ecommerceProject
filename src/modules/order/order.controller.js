import { AppError } from "../../../AppError.js";
import cartModel from "../../../DB/models/cart.model.js";
import couponModel from "../../../DB/models/coupon.model.js";
import orderModel from "../../../DB/models/order.model.js";
import productModel from "../../../DB/models/product.model.js";
import userModel from "../../../DB/models/user.model.js";

export const createOrder= async (req, res, next) => {
   const {couponName}=req.body;
    const cart= await cartModel.findOne({userId:req.id});
    if(!cart){
        return next(new AppError(`cart is empty `, 409));

    }
    req.body.products= cart.products;
    if(couponName){
        const coupon= await couponModel.findOne({name:couponName})
    
    if(!coupon){
        return next(new AppError(`coupon not found `, 409));

    }
    if(coupon.expireDate< new Date()){
        return next(new AppError(`coupon expired `, 409));

    }
    if(coupon.usedBy.includes(req.id)){
        return next(new AppError(`coupon alredy used `, 409));
    }
    req.body.coupon=coupon;

}
let finalProductList=[];
let subTotal=0;
for(let product of req.body.products){
    const checkProduct= await productModel.findOne({
        _id:product.productId,
        stock:{$gte:product.quantity}
    });
    if(!checkProduct){
        return next(new AppError(`product quantity not available `, 409));

    }
    product=product.toObject();
    product.productName=checkProduct.name;
    product.unitPrice= checkProduct.price;
    product.finalPrice=product.quantity*checkProduct.price;
    subTotal+=product.finalPrice;
    finalProductList.push(product);
}
const user=await userModel.findById(req.id);
if(!req.body.address){
    req.body.address=user.address;
}

if(!req.body.phone){
    req.body.phone=user.phone;
}

const order= await orderModel.create({
    userId:user._id,
    products:finalProductList,
     finalPrice :subTotal - (subTotal * (req.body.coupon?.amount || 0) / 100),
    address: req.body.address,
phone:req.body.phone,
couponId:req.body.coupon._id,
notes:req.body.notes,
updatedBy:req.id,
});

if(order){
    for(const product of req.body.products){
        await productModel.findOneAndUpdate({
            _id:product.productId
        },{
            $inc:{
                stock:-product.quantity
            }
        
        })
    }


if(req.body.coupon){
    await couponModel.updateOne({ 
        _id:req.body.coupon._id},{
            $addToSet:{
                usedBy:req.id
            }
        }
    )
}

await cartModel.updateOne({userId:req.id},
    {
        products:[],
    }
)


}

return res.status(200).json({message:"success",order})
};
