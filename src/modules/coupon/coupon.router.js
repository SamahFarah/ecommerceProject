import { Router } from "express";
const router=Router();
import * as couponController from './coupon.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { endPoints } from "./coupon.role.js";
import * as schema from './coupon.validation.js';




router.post('/',validation(schema.createCouponSchema),auth(endPoints.create),asyncHandler(couponController.createCoupon));

export default router;