import { Schema, model,Types} from 'mongoose';

const couponSchema = new Schema({
    name: {
        type: String,
        unique:true,
        required: true,
    },
   amount: {
         type:Number,
         required:true,
    },
    usedBy: [{
        type: Types.ObjectId,
        ref:'User',
        required:true,
        
    }],
    expireDate:{
        type:Date,
        required:true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required:true,

    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User',
        required:true,
    }
}, {
    timestamps: true  
});

const couponModel = model('Coupon', couponSchema);
export default couponModel;