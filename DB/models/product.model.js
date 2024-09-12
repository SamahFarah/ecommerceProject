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
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    mainImage: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    subImages: [{               
        secure_url: { type: String, required: false },
        public_id: { type: String, required: false }
    }],
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
        default: function() {
            return this.price - (this.price * this.discount / 100);
        }
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
    colors: [String], 
    sizes: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'not_active'],
        default: 'not_active'
    }
}, {
    timestamps: true  
});

const productModel = model('Product', productSchema);
export default productModel;
