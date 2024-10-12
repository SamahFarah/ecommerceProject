import { Schema, model, Types } from 'mongoose';


const orderSchema = new Schema({
   userId:{
    type:Types.ObjectId,
    ref:'User',
    required:true
   },
   products:[
    {
        productName:{
            type:String,
        },
        productId:{
            type: Types.ObjectId,
            ref:'Products',
            required:true,
        },
        quantity:{
            type:Number,
            ref:'Product',
            required:true,

        },
        unitPrice:{
            type:Number,
            required:true,

        },
        finalPrice:{
            type:Number,
            required:true,
        }
    }
   ],
   finalPrice:{
    type:Number,
   required:true,
   },
  address:{
    type:String,
    required:true,

  },
  phone:{
    type:String,
    required:true,
  },
  paymentType:{
    type:String,
     enum:['cash','card'],
     default:'cash',
  },
  couponId:{
    type:Types.ObjectId,
    ref:'Coupon'
  },
  status:{
    type:String,
    enum:['pending','cancelled','confirmed','onWay','delivered'],
    default:'pending'
  },
  notes:{
    type:String,
    
  },
  rejectedReason:{
    type:String,

  },
  updatedBy:{
    type:Types.ObjectId,
    ref:'User',
    required:true,
  }

}, {
    timestamps: true  
});

const orderModel = model('Order', orderSchema);
export default orderModel;