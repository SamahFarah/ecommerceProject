import { Router } from "express";
const router=Router();
import * as orderController from './order.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { endPoints } from "./order.role.js";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validation.js";




router.post('/',auth(endPoints.create),validation(createOrderSchema),asyncHandler(orderController.createOrder));
router.get('/pending-orders', auth(endPoints.getPendingOrders), asyncHandler(orderController.getPendingOrders));
router.patch('/update-status/:orderId',auth(endPoints.updateOrderStatus),validation(updateOrderStatusSchema),asyncHandler(orderController.updateOrderStatus));
router.get('/confirmed-orders', auth(endPoints.confirmedOrders), asyncHandler(orderController.getConfirmedOrders));
router.patch('/update-delivery-status/:orderId',auth(endPoints.updateDliverystatus), asyncHandler(orderController.updateDeliveryStatus));



export default router;