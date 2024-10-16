import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import categoryRouter from "./modules/category/category.router.js"
import productRouter from "./modules/product/product.router.js";
//import SubcategoryRouter from "./modules/Subcategory/Subcategory.router.js"
import cartRouter from "./modules/cart/cart.router.js";
import couponRouter from "./modules/coupon/coupon.router.js";
import orderRouter from "./modules/order/order.router.js";

const initApp = (app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/category',categoryRouter);
    //app.use('/Subcategory',SubcategoryRouter);
    app.use('/product',productRouter);
    app.use('/cart',cartRouter);
    app.use('/coupon',couponRouter);
    app.use('/order',orderRouter);




    app.use('*',(req,res,next)=>{
        //return res.status(404).json({message:"page not found"});
        return next(new Error(`page not found`));
    });

    app.use((err, req, res, next) => {
     
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).json({ message: err.message || 'Internal Server Error' });
    });
    
    
}
export default initApp;