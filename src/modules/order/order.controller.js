import { AppError } from "../../../AppError.js";
import cartModel from "../../../DB/models/cart.model.js";
import couponModel from "../../../DB/models/coupon.model.js";
import orderModel from "../../../DB/models/order.model.js";
import productModel from "../../../DB/models/product.model.js";
import userModel from "../../../DB/models/user.model.js";
 import createInvoice from "../../Utils/pdf.js";


export const createOrder= async (req, res, next) => {
   const {couponName}=req.body;
    const cart= await cartModel.findOne({userId:req.id});
    if (!cart || !cart.products.length) {
      return next(new AppError(`cart is empty`, 409));
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
couponId:req.body.coupon ? req.body.coupon._id : null,
notes:req.body.notes,
updatedBy:req.id,
});

if(order){

const invoice = {
  shipping: {
    name: user.username,
    address: order.address,
   phone: order.phone ,
  },
  items: order.products,
  subtotal: order.finalPrice,
  
  invoice_nr: order._id,
};

createInvoice(invoice, "invoice.pdf");
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

export const getPendingOrders = async (req, res, next) => {
    try {
      const pendingOrders = await orderModel.find({ status: 'pending' });
      
      if (pendingOrders.length === 0) {
        return res.status(404).json({ message: 'No pending orders found' });
      }
  
      return res.status(200).json({ message: 'Success', orders: pendingOrders });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateOrderStatus = async (req, res, next) => {
    try {
        const { newStatus } = req.body;
        const { orderId } = req.params;
      
      const order = await orderModel.findById(orderId);
  
      if (!order) {
        return next(new AppError('Order not found', 404));
      }
  
      if (order.status === 'cancelled') {
        return next(new AppError('Order is already cancelled', 400));
      }
      if (newStatus === 'cancelled') {
       
        for (const product of order.products) {
          await productModel.findOneAndUpdate(
            { _id: product.productId },
            { $inc: { stock: product.quantity } }
          );
        }
  
        
        if (order.couponId) {
          await couponModel.updateOne(
            { _id: order.couponId },
            { $pull: { usedBy: order.userId } }
          );
        }
      } else if (newStatus === 'confirmed') {
        
        order.status = newStatus;
        await order.save();
        return res.status(200).json({ message: 'success', order });
      }
  
      order.status = newStatus;
      await order.save();
  
      return res.status(200).json({ message: 'success', order });
    } catch (error) {
      next(error);
    }
  };

  export const getConfirmedOrders = async (req, res, next) => {
    try {
      const confirmedOrders = await orderModel.find({ status: 'confirmed' });
      return res.status(200).json({ message: 'Success', orders: confirmedOrders });
    } catch (error) {
      next(error);
    }
  };


  export const updateDeliveryStatus = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { newStatus } = req.body;
  
      const order = await orderModel.findById(orderId);
      if (!order) {
        return next(new AppError('Order not found', 404));
      }
  
      
      if (newStatus === 'onWay' || newStatus === 'delivered') {
        order.status = newStatus;
        await order.save();
        return res.status(200).json({ message: "success", order });
      }
  
      
      if (newStatus === 'rejected') {
        for (const product of order.products) {
            await productModel.findOneAndUpdate(
              { _id: product.productId },
              { $inc: { stock: product.quantity } } 
            );
          }
        
        order.status = 'rejected';
        await order.save();
  
   
        const user = await userModel.findById(order.userId);
        user.rejectedOrdersCount += 1;
  
       
        if (user.rejectedOrdersCount >= 3) {
          user.isBlacklisted = true;
        }
  
        await user.save();
        return res.status(200).json({ message: 'success', order });
      }
    } catch (error) {
      next(error);
    }
  };
  
  
  