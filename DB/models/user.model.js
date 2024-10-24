import { Schema,model } from 'mongoose';
/*[ username,email,password,image,phone,address,confirmEmail,gender,status,role ]
status  : active or not active
role : user or admin*/

const userSchema = new Schema({
username :{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},
image: {
    type: Object,
    required: true,

},
phone:{
    type:String,
},
address:{
    type:String,
},
confirmEmail:{
    type:Boolean,
default:false,
},
gender:{  //male or : female .fe male . Female . fe_male... there is alot of ways to write it so : put enum
type:String,
enum :['Male','Female']
},
status:{
    type:String,
    enum:['active','not_active'],
    default:'not_active'
    
},
role:{
    type:String,
    enum:['user','admin','delivery'],
    default:'user'
},
sendCode:{
    type:String,
    default:null
},
rejectedOrdersCount: {
    type: Number,
    default: 0, // عدد مرات الرفض
  },
  isBlacklisted: {
    type: Boolean,
    default: false, // حالة البلاك ليست
  },
},{
    timestamps:true
});
const userModel= model('User',userSchema);
export default userModel;