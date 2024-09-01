import connectDB from "../DB/connection.js";

const initApp = (app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('*',(req,res,next)=>{
        //return res.status(404).json({message:"page not found"});
        return next(new Error(`page not found`));
    });

    app.use( (err,req,res,next)=>{
          return res.status(err.statusCode).json({message:err.message});
    });
    
}
export default initApp;