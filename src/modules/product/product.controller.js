import { AppError } from "../../../AppError.js";
import cloudinary from "../../Utils/cloudinary.js";
import categoryModel from "../../../DB/models/category.model.js";
import subcategoryModel from "../../../DB/models/Subcategory.model.js";
import productModel from "../../../DB/models/product.model.js";


export const createProduct = async (req, res, next) => {


    const category = await categoryModel.findById(req.body.category);
    if (!category) {
        return next(new AppError('Category does not exist', 404));
    }

  

    const subcategory = await subcategoryModel.findOne({
        _id: req.body.subcategory,
        categoryId: req.body.category
    });
    
    if (!subcategory) {
        return next(new AppError('Subcategory does not exist in this category', 404));
    }


    const existingProduct = await productModel.findOne({
        name: req.body.name.toLowerCase(),
        subcategory: req.body.subcategory
    });

    if (existingProduct) {
        return next(new AppError('Product with the same name already exists in this subcategory', 400));
    }

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
        folder: `${process.env.APPNAME}/products/${req.body.name}`
    });
    

let subImages= [];
if(req.files.subImages){
    for(const file of req.files.subImages){
        const upload= await cloudinary.uploader.upload(file.path,{folder: `${process.env.APPNAME}/products/${req.body.name}/subImages`});
            
            subImages.push({
                secure_url: upload.secure_url,
                public_id: upload.public_id,
            })
    }
}

let price= req.body.price

let discount = req.body.discount || 0;  
let priceAfterDiscount = price - (price * discount / 100);


    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;

    const product = await productModel.create({
        name: req.body.name,
        description: req.body.description,
        mainImage: { secure_url, public_id },
        subImages,
        price,
        stock: req.body.stock,
        category: req.body.category,
        subcategory: req.body.subcategory,
        priceAfterDiscount,
        discount,
    });

    return res.status(201).json({ message: "success", product });
};



export const getProducts = async (req, res, next) => {
    const { categoryId, subcategoryId } = req.params;

    
    const subcategories = await subcategoryModel.findOne({
        _id: subcategoryId,
        categoryId: categoryId
    });

    if (!subcategories) {
        return next(new AppError('Subcategory does not belong to the given category', 404));
    }

   
    const products = await productModel.find({ subcategory: subcategoryId })
        .populate('reviews');

    
    return res.status(200).json({
        message: "success",
        products
    });
};



export const getProductById = async (req, res, next) => {
    const { productId } = req.params;

   
      
        const product = await productModel.findById(productId);

       
        if (!product) {
            return next(new AppError('Product not found', 404));
        }

        
        return res.status(200).json({
            message: "success",
            product
        });

    
};


export const deleteProductById = async (req, res, next) => {
    const { productId } = req.params;

        const product = await productModel.findById(productId);

        if (!product) {
            return next(new AppError('Product not found', 404));
        }

        
        if (product.mainImage && product.mainImage.public_id) {
            await cloudinary.uploader.destroy(product.mainImage.public_id);
        }

        
        await productModel.findByIdAndDelete(productId);

        
        return res.status(200).json({
            message: "success"
        });
   
};

