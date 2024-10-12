import { AppError } from "../../../AppError.js";
import cloudinary from "../../Utils/cloudinary.js";
import reviewModel from "../../../DB/models/reviews.model.js";
import productModel from "../../../DB/models/product.model.js";
import orderModel from "../../../DB/models/order.model.js";

export const createReview= async (req, res, next) => {
const {productId}=req.params;
const {comment,rating}=req.body;
const order=await orderModel.findOne({
    userId:req.id,
    status:"delivered",
    "products.productId":productId,
})
if(!order){
    return next(new AppError('cannot review this product', 404));

}
if(req.file){
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: `${process.env.APPNAME}/${productId}/reviews`
    });
    req.body.image= {secure_url,public_id};

}
const review= await reviewModel.create({
    comment,rating,userId:req.id,productId,image:req.body.image
})
return res.status(200).json({message:"success",review})
}
