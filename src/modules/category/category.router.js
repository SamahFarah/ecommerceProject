import { Router } from "express";
const router=Router();
import * as categoryController from './category.controller.js';
import validation from "../../Middleware/validation.js";
import * as schema from './category.validation.js'
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload, { fileType } from "../../Utils/multer.js";
import { endPoints } from "./category.role.js";
import SubcategoryRouter from "./../Subcategory/Subcategory.router.js";

const upload = fileUpload(fileType.image).single('image');

router.use('/:categoryId/Subcategory',SubcategoryRouter)
router.post('/',upload,validation(schema.createCategorySchema),auth(endPoints.create),asyncHandler(categoryController.createCategory));
router.get('/',asyncHandler(categoryController.getCatergories));
router.get('/:id',validation(schema.getCategoryByIdSchema),asyncHandler(categoryController.getCategoryById));
router.put('/:id',validation(schema.updateCategorySchema),auth(endPoints.update),asyncHandler(categoryController.updateCategoryDetails ));
router.put('/image/:id',upload,validation(schema.updateCategoryImageSchema),auth(endPoints.update),asyncHandler(categoryController.updateCategoryImage ));
router.delete('/:id',validation(schema.deleteCategorySchema),auth(endPoints.update),asyncHandler(categoryController.deleteCategory));
export default router;