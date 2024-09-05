import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../../AppError.js";
import cloudinary from "../../Utils/cloudinary.js";
import categoryModel from "../../../DB/models/category.model.js";

export const createCategory = async (req, res, next) => {
    
   
        const userId = req.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return next(new AppError('User not found', 404));
        }

        if (req.role !== 'admin') {
            return next(new AppError('You do not have Authentication to create category.', 403));
        }

        const { name, status } = req.body;
        const existingCategory = await categoryModel.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') } 
        });

        if (existingCategory) {
            return next(new AppError('Category with this name already exists', 400));
        }
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/category`});
        const newCategory= await categoryModel.create ({name,image:{secure_url,public_id},status,createdBy:user._id,updatedBy:user._id});


        return res.status(201).json({ message: "Category created successfully", category:{name,image:newCategory.image,status} });


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
            const userRole = req.role;  

                if (userRole !== 'admin') {
                return next(new AppError('You do not have Authentication to update this category.', 403));
            }
    
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
                message: "Category details updated successfully : ",
                category: {
                    name: updatedCategory.name,
                    status: updatedCategory.status,
                    updatedBy: updatedCategory.updatedBy
                }
            });
    };


export const updateCategoryImage = async (req, res, next) => {
    
        const userId = req.id; 
        const userRole = req.role;  

        if (userRole !== 'admin') {
            return next(new AppError('You do not have Authentication to update this category.', 403));
        }

        const { id } = req.params; 

        if (!req.file) {
            return next(new AppError('No image file provided', 400));
        }
        if (!req.file.path) {
            return next(new AppError('File path is undefined', 400));
        }
    
        const { secure_url } = await cloudinary.uploader.upload(req.file.path);
        console.log("Uploaded Image URL:", secure_url);

      
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
        console.log("Updated Category:", updatedCategory);


        return res.status(200).json({
            message: "Category image updated successfully",
            category: {
                image: updatedCategory.image,
                updatedBy: updatedCategory.updatedBy
            }
        });
    
};

    

export const deleteCategory = async (req, res, next) => {
 
        
        const userRole = req.role;  

        if (userRole !== 'admin') {
            return next(new AppError('You do not have Authentication to delete this category.', 403));
        }

        const { id } = req.params; 
        const category = await categoryModel.findByIdAndDelete(id);

        if (!category) {
            return next(new AppError('Category not found', 404));
        }

        return res.status(200).json({
            message: "Category deleted successfully"
        });
    
};


