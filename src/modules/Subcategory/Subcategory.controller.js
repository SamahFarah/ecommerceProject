import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../../AppError.js";
import cloudinary from "../../Utils/cloudinary.js";
import categoryModel from "../../../DB/models/category.model.js";
import subcategoryModel from "../../../DB/models/subcategory.model.js";

export const createSubcategory = async (req, res, next) => {
 
    req.body.name = req.body.name.toLowerCase();
    const category = await categoryModel.findById(req.params.categoryId);
    if (!category) {
        return next(new AppError('Category does not exist', 404));
    }
    
    const existingSubcategory = await subcategoryModel.findOne({
        name: req.body.name,
        categoryId: req.params.categoryId
    });

   
    if (existingSubcategory) {
        return next(new AppError('Subcategory name already exists in this category', 400));
    }

   
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APPNAME}/category/subcategory`
    });

    
    req.body.image = { secure_url, public_id };

   
    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;

    req.body.categoryId = req.params.categoryId;

    const subcategory = await subcategoryModel.create(req.body);

   
    return res.status(201).json({ message: "success", subcategory });
};





export const getSubcategories = async (req, res, next) => {
    
        const populatedSubcategory = await subcategoryModel.find({})
            .populate([
                {
                    path: 'createdBy',
                    select: 'username'
                },
                {
                    path: 'updatedBy',
                    select: 'username'
                },
                {
                    path: 'categoryId', 
                    select: 'name'
                }
            ]);

        return res.status(200).json({ message: "success", subcategories: populatedSubcategory });
    
};

export const getSubcategoryById = async (req, res, next) => {
  
        const { id } = req.params;
        const subcategory = await subcategoryModel.findById(id)
            .populate([
                {
                    path: 'createdBy',
                    select: 'username'
                },
                {
                    path: 'updatedBy',
                    select: 'username'
                },
                {
                    path: 'categoryId',
                    select: 'name'
                }
            ]);

        if (!subcategory) {
            return next(new AppError('Subcategory not found', 404));
        }

        return res.status(200).json({ message: "success", subcategory });
    
};


export const updateSubcategoryDetails = async (req, res, next) => {
   
        const userId = req.id; 
        const { id } = req.params; 
        const { name, status, categoryId } = req.body; 

        const updateFields = {};
        if (name) {
            updateFields.name = name;
        }
        if (status) {
            updateFields.status = status;
        }
        if (categoryId) {
            
            const categoryExists = await categoryModel.findById(categoryId);
            if (!categoryExists) {
                return next(new AppError('Category not found', 404));
            }
            updateFields.categoryId = categoryId;
        }

        if (Object.keys(updateFields).length > 0) {
            updateFields.updatedBy = userId; 
        }

        const updatedSubcategory = await subcategoryModel.findByIdAndUpdate(id, updateFields, 
            { new: true }).populate('updatedBy', 'username').populate('categoryId', 'name');

        if (!updatedSubcategory) {
            return next(new AppError('Subcategory not found', 404));
        }

        return res.status(200).json({
            message: "success",
            subcategory: {
                name: updatedSubcategory.name,
                status: updatedSubcategory.status,
                category: updatedSubcategory.categoryId,
                updatedBy: updatedSubcategory.updatedBy
            }
        });
    
};


export const updateSubcategoryImage = async (req, res, next) => {
    
        const userId = req.id;
        const { id } = req.params;

        if (!req.file) {
            return next(new AppError('No image file provided', 400));
        }

        if (!req.file.path) {
            return next(new AppError('File path is undefined', 400));
        }

      
        const subcategory = await subcategoryModel.findById(id);
        if (!subcategory) {
            return next(new AppError('Subcategory not found', 404));
        }

        
        if (subcategory.image && subcategory.image.public_id) {
            await cloudinary.uploader.destroy(subcategory.image.public_id);
        }


        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APPNAME}/category/subcategory` });


       
        const updatedSubcategory = await subcategoryModel.findByIdAndUpdate(
            id,
            {
                image: { secure_url, public_id },
                updatedBy: userId
            },
            { new: true }
        ).populate('updatedBy', 'username');

        if (!updatedSubcategory) {
            return next(new AppError('Subcategory not found', 404));
        }

        return res.status(200).json({
            message: "success",
            subcategory: {
                image: updatedSubcategory.image,
                updatedBy: updatedSubcategory.updatedBy
            }
        });
    
};


export const deleteSubcategory = async (req, res, next) => {
  
        const { id } = req.params;
        const subcategory = await subcategoryModel.findByIdAndDelete(id);

        if (!subcategory) {
            return next(new AppError('Subcategory not found', 404));
        }

        
        if (subcategory.image && subcategory.image.public_id) {
            await cloudinary.uploader.destroy(subcategory.image.public_id);
        }

        return res.status(200).json({
            message: "success"
        });
   
};


