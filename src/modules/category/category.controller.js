import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../../AppError.js";
import cloudinary from "../../Utils/cloudinary.js";
import categoryModel from "../../../DB/models/category.model.js";

export const createCategory = async (req, res, next) => {
    

        req.body.name=req.body.name.toLowerCase();
        const existingCategory = await categoryModel.findOne({ name: req.body.name });
        if (existingCategory) {
            return next(new AppError('Category name already exists', 400));
        }
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/category`});
        req.body.image=  {secure_url,public_id};
        req.body.createdBy=req.id;
        req.body.updatedBy=req.id;
        const category= await categoryModel.create(req.body);


        return res.status(201).json({ message: "success", category});


};


export const getCatergories = async (req,res,next)=>{

    const populatedCategory = await categoryModel.find({})
    .populate([
        {
           path:'createdBy',
           select:'username'
        },
        {
         path:'updatedBy',
           select:'username'
        }
    ]);
        


    //another way:
     /*  const populatedCategory = await categoryModel.findById(newCategory._id)
    .populate('createdBy', 'username')
    .populate('updatedBy', 'username');*/

    return res.status(200).json({message:"success",Categories:populatedCategory})

};

 


export const getCategoryById = async (req, res, next) => {
    
        const { id } = req.params;
        const category = await categoryModel.findById(id);

        if (!category) {
            return next(new AppError('Category not found', 404));
        }

        return res.status(200).json({message: "success",category})
           
       
    } 


    export const updateCategoryDetails = async (req, res, next) => {
       
            const userId = req.id; 
            
            const { id } = req.params; 
            const { name, status } = req.body; 
    
            
            const updateFields = {};
            if (name) {
                updateFields.name = name;
            }
            if (status) {
                updateFields.status = status;
            }
    
            if (Object.keys(updateFields).length > 0) {
                updateFields.updatedBy = userId; 
            }
    
            
            const updatedCategory = await categoryModel.findByIdAndUpdate(id, updateFields, 
                { new: true }).populate('updatedBy','username');
    
            if (!updatedCategory) {
                return next(new AppError('Category not found', 404));
            }
    
            return res.status(200).json({
                message: "success ",
                category: {
                    name: updatedCategory.name,
                    status: updatedCategory.status,
                    updatedBy: updatedCategory.updatedBy
                }
            });
    };


export const updateCategoryImage = async (req, res, next) => {
    
        const userId = req.id; 
       
        const { id } = req.params; 

        if (!req.file) {
            return next(new AppError('No image file provided', 400));
        }
        if (!req.file.path) {
            return next(new AppError('File path is undefined', 400));
        }
    
        const { secure_url } = await cloudinary.uploader.upload(req.file.path);
       // console.log("Uploaded Image URL:", secure_url);

      
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {
                image: secure_url,
                updatedBy: userId
            },
            { new: true }
        ).populate('updatedBy', 'username'); 

        if (!updatedCategory) {
            return next(new AppError('Category not found', 404));
        }
       // console.log("Updated Category:", updatedCategory);


        return res.status(200).json({
            message: "success",
            category: {
                image: updatedCategory.image,
                updatedBy: updatedCategory.updatedBy
            }
        });
    
};

    

export const deleteCategory = async (req, res, next) => {
 
        
       

        const { id } = req.params; 
        const category = await categoryModel.findByIdAndDelete(id);

        if (!category) {
            return next(new AppError('Category not found', 404));
        }
        await cloudinary.uploader.destroy(category.image.public_id);

        return res.status(200).json({
            message: "success"
        });
    
};


