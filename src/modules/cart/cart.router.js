import { Router } from "express";
const router=Router();
import * as cartController from './cart.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { addToCartSchema, removeItemSchema, updateQuantitySchema } from "./cart.validation.js";
import { endPoints } from "../cart/cart.role.js";

router.post('/',auth(endPoints.create),validation(addToCartSchema),asyncHandler(cartController.addToCart));
router.delete('/',auth(endPoints.remove),validation(removeItemSchema),asyncHandler(cartController.removeItem));
router.delete('/clear',auth(endPoints.clear),asyncHandler(cartController.clearCart));
//router.put('/increase/:productId',auth(endPoints.increase),validation(increaseQuantitySchema),asyncHandler(cartController.increaseQuantity));
//router.put('/decrease/:productId',auth(endPoints.decrease),validation(decreaseQuantitySchema),asyncHandler(cartController.decreaseQuantity));
router.put('/update-quantity/:productId',auth(endPoints.update),validation(updateQuantitySchema),asyncHandler(cartController.updateQuantity));
router.get('/',auth(endPoints.get),asyncHandler(cartController.getCart));



export default router;
   
    
    


