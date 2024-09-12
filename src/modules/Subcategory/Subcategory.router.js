import { Router } from "express";
const router=Router({mergeParams:true});
import * as SubcategoryController from './Subcategory.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload from "../../Utils/multer.js";
import { endPoints } from "./Subcategory.role.js";
import { createSubCategorySchema, deleteSubCategorySchema, getSubCategoryByIdSchema, updateSubCategoryImageSchema, updateSubCategorySchema } from "./Subcategory.validation.js";
const upload = fileUpload().single('image');

router.post('/', auth(endPoints.create), upload, validation(createSubCategorySchema), asyncHandler(SubcategoryController.createSubcategory));

router.get('/',asyncHandler(SubcategoryController.getSubcategories));

router.get('/:subcategoryId',validation(getSubCategoryByIdSchema),asyncHandler(SubcategoryController.getSubcategoryById));

router.put('/:subcategoryId',auth(endPoints.update),validation(updateSubCategorySchema),asyncHandler(SubcategoryController.updateSubcategoryDetails ));

router.put('/image/:subcategoryId',auth(endPoints.update),upload,validation(updateSubCategoryImageSchema),asyncHandler(SubcategoryController.updateSubcategoryImage ));

router.delete('/:subcategoryId',auth(endPoints.delete),validation(deleteSubCategorySchema),asyncHandler(SubcategoryController.deleteSubcategory));


export default router;
