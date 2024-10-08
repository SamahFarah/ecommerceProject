import { Router } from "express";
const router=Router();
import * as categoryController from './category.controller.js';
import validation from "../../Middleware/validation.js";
import { createCategorySchema, deleteCategorySchema, getCategoryByIdSchema, updateCategoryImageSchema, updateCategorySchema } from "./category.validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload from "../../Utils/multer.js";
import { endPoints } from "./category.role.js";
import SubcategoryRouter from "./../Subcategory/Subcategory.router.js";

const upload = fileUpload().single('image');

router.use('/:categoryId/Subcategory',SubcategoryRouter)
router.post('/',auth(endPoints.create),upload,validation(createCategorySchema),asyncHandler(categoryController.createCategory));
router.get('/',asyncHandler(categoryController.getCatergories));
router.get('/:id',validation(getCategoryByIdSchema),asyncHandler(categoryController.getCategoryById));
router.put('/:id',auth(endPoints.update),validation(updateCategorySchema),asyncHandler(categoryController.updateCategoryDetails ));
router.put('/image/:id',auth(endPoints.update),upload,validation(updateCategoryImageSchema),asyncHandler(categoryController.updateCategoryImage ));
router.delete('/:id',auth(endPoints.update),validation(deleteCategorySchema),asyncHandler(categoryController.deleteCategory));
export default router;