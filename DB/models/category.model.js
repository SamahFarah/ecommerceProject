import { Schema, model,Types} from 'mongoose';
/*create category model  
[ name , image ,status , createdBy,updatedBy ]
status  : active or not active
createdBy => يتم ربطها مع جدول اليوزر
updatedBy => يتم ربطها مع جدول اليوزر*/

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
        required: true,

    },
    status: {
        type: String,
        enum: ['active', 'not_active'],
        default:'not_active'
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

const categoryModel = model('Category', categorySchema);
export default categoryModel;
