import { Router } from "express";
const router= Router({mergeParams:true});

import * as ReviewController from './review.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload, { fileType } from "../../Utils/multer.js";
import { endPoints } from "./review.role.js";
import * as schema from './review.validation.js';

//const upload = fileUpload().single('image');


router.post('/',fileUpload(fileType.image).fields([{name: 'image',maxCount: 1}]),validation(schema.createReviewSchema),auth(endPoints.create),asyncHandler(ReviewController.createReview))





export default router;
