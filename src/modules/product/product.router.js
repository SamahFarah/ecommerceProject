import { Router } from "express";
const router=Router();
import * as ProductController from './product.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload from "../../Utils/multer.js";
import { endPoints } from "./product.role.js";
import reviewRouter from "./../review/review.router.js"
import { createProductSchema, deletetProductSchema, getProductsByIdSchema, getProductsSchema} from "./product.validation.js";
//const upload = fileUpload().single('image');
router.use('/:productId/review',reviewRouter)

router.post('/', auth(endPoints.create), fileUpload().fields([{name: 'mainImage',maxCount: 1},
    {name : 'subImages',maxCount: 5}]),
 validation(createProductSchema),asyncHandler(ProductController.createProduct));
router.get('/:categoryId/:subcategoryId',validation(getProductsSchema),asyncHandler(ProductController.getProducts));
router.get('/:productId',validation(getProductsByIdSchema),asyncHandler(ProductController.getProductById));
router.delete('/:productId', auth(endPoints.delete),validation(deletetProductSchema),asyncHandler(ProductController.deleteProductById));

export default router;
