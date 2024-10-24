import { Router } from "express";
const router=Router({mergeParams:true});
import * as SubcategoryController from './Subcategory.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload, { fileType } from "../../Utils/multer.js";
import { endPoints } from "./Subcategory.role.js";
import * as schema from './Subcategory.validation.js';


const upload = fileUpload(fileType.image).single('image');

router.post('/',upload,validation(schema.createSubCategorySchema),auth(endPoints.create),asyncHandler(SubcategoryController.createSubcategory));

router.get('/',asyncHandler(SubcategoryController.getSubcategories));

router.get('/:subcategoryId',validation(schema.getSubCategoryByIdSchema),asyncHandler(SubcategoryController.getSubcategoryById));

router.put('/:subcategoryId',validation(schema.updateSubCategorySchema),auth(endPoints.update),asyncHandler(SubcategoryController.updateSubcategoryDetails ));

router.put('/image/:subcategoryId',upload,validation(schema.updateSubCategoryImageSchema),auth(endPoints.update),asyncHandler(SubcategoryController.updateSubcategoryImage ));

router.delete('/:subcategoryId',validation(schema.deleteSubCategorySchema),auth(endPoints.delete),asyncHandler(SubcategoryController.deleteSubcategory));


export default router;
