import { Schema, model, Types } from 'mongoose';


const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min:1,
        max:5,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
    },
    image:{

    type: Object,
    },
    status: {
        type: String,
        enum: ['active', 'not_active'],
        default: 'not_active'
    }
}, {
    timestamps: true  
});

const reviewModel = model('Review', reviewSchema);
export default reviewModel;
