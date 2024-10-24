import { Router } from "express";
const router=Router();
import * as ProductController from './product.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload, { fileType } from "../../Utils/multer.js";
import { endPoints } from "./product.role.js";
import reviewRouter from "./../review/review.router.js"
import * as schema from './product.validation.js';

//const upload = fileUpload().single('image');
router.use('/:productId/review',reviewRouter)

router.post('/',fileUpload(fileType.image).fields([{name: 'mainImage',maxCount: 1},
    {name : 'subImages',maxCount: 5}]),validation(schema.createProductSchema),auth(endPoints.create),
asyncHandler(ProductController.createProduct));
router.get('/:categoryId/:subcategoryId',validation(schema.getProductsSchema),asyncHandler(ProductController.getProducts));
router.get('/:productId',validation(schema.getProductsByIdSchema),asyncHandler(ProductController.getProductById));
router.delete('/:productId',validation(schema.deletetProductSchema),auth(endPoints.delete),asyncHandler(ProductController.deleteProductById));

export default router;
