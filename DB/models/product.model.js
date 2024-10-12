import { Schema, model, Types } from 'mongoose';

/* create product model
[ name, description, mainImage, subImages, price, discount, priceAfterDiscount, stock, category, subcategory, colors, sizes, status ]
status: active or not active
category => يتم ربطها مع جدول الكاتيجوري
subcategory => يتم ربطها مع جدول السب كاتيجوري
*/



const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    description: {
        type: String,
        required: true
    },
    mainImage: {
        type: Object,
        required: true,
    },
    subImages: {
        type: Object,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    priceAfterDiscount: {
        type: Number,
        
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    colors:{

    type: [String],
    },
    sizes: {
        type: [String],
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
       
    },
    status: {
        type: String,
        enum: ['active', 'not_active'],
        default: 'not_active'
    }
}, {
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
productSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'productId'
})

const productModel = model('Product', productSchema);
export default productModel;
