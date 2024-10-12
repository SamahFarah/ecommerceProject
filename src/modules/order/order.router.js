import { Router } from "express";
const router=Router();
import * as orderController from './order.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { endPoints } from "./order.role.js";




router.post('/',auth(endPoints.create),asyncHandler(orderController.createOrder));

export default router;