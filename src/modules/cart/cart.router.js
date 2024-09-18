import { Router } from "express";
const router=Router();
import * as cartController from './cart.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { addToCartSchema, removeItemSchema } from "./cart.validation.js";
import { endPoints } from "../cart/cart.role.js";

router.post('/',auth(endPoints.create),validation(addToCartSchema),asyncHandler(cartController.addToCart));
router.delete('/',auth(endPoints.remove),validation(removeItemSchema),asyncHandler(cartController.removeItem));

export default router;
