import { Router } from "express";
const router=Router();
import * as cartController from './cart.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import * as schema from './cart.validation.js';

import { endPoints } from "../cart/cart.role.js";

router.post('/',validation(schema.addToCartSchema),auth(endPoints.create),asyncHandler(cartController.addToCart));
router.delete('/',validation(schema.removeItemSchema),auth(endPoints.remove),asyncHandler(cartController.removeItem));
router.delete('/clear',auth(endPoints.clear),asyncHandler(cartController.clearCart));
//router.put('/increase/:productId',auth(endPoints.increase),validation(increaseQuantitySchema),asyncHandler(cartController.increaseQuantity));
//router.put('/decrease/:productId',auth(endPoints.decrease),validation(decreaseQuantitySchema),asyncHandler(cartController.decreaseQuantity));
router.put('/update-quantity/:productId',validation(schema.updateQuantitySchema),auth(endPoints.update),asyncHandler(cartController.updateQuantity));
router.get('/',auth(endPoints.get),asyncHandler(cartController.getCart));



export default router;
   
    
    


