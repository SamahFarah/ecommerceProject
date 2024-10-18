import { Schema, model, Types } from 'mongoose';

/*create subcategory model  
[ name, image, status, categoryId, createdBy, updatedBy ]
status  : active or not active
categoryId => يتم ربطها مع جدول الكاتيجوري
createdBy => يتم ربطها مع جدول اليوزر
updatedBy => يتم ربطها مع جدول اليوزر
*/

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: { type: String, required: true, unique: true },

    image: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'not_active'],
        default: 'not_active'
    },
    categoryId: {
        type: Types.ObjectId,
        ref: 'Category', 
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true  
});

const subcategoryModel = model('Subcategory', subcategorySchema);
export default subcategoryModel;
