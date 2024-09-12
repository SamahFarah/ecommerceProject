import { Router } from "express";
const router=Router();
import * as ProductController from './product.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload from "../../Utils/multer.js";
import { endPoints } from "./product.role.js";
import { createProductSchema } from "./product.validation.js";
const upload = fileUpload().single('image');


router.post('/', auth(endPoints.create), upload, validation(createProductSchema), asyncHandler(ProductController.createProduct));

export default router;
