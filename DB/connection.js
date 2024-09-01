import mongoose from 'mongoose';
 const connectDB = ()=> {
    return mongoose.connect(process.env.DB_LOCAL).then(result=>{
        console.log(`db connection established`);
    }).catch(err=>{
        console.log(`error to connect db:  ${err}`);  
    })
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
export default connectDB;