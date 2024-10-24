import { Router } from "express";
const router=Router();
import * as orderController from './order.controller.js';
import validation from "../../Middleware/validation.js";
import { auth,roles } from "../../Middleware/auth.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { endPoints } from "./order.role.js";
import * as schema from './order.validation.js';




router.post('/',validation(schema.createOrderSchema),auth(endPoints.create),asyncHandler(orderController.createOrder));
router.get('/pending-orders', auth(endPoints.getPendingOrders), asyncHandler(orderController.getPendingOrders));
router.patch('/update-status/:orderId',validation(schema.updateOrderStatusSchema),auth(endPoints.updateOrderStatus),asyncHandler(orderController.updateOrderStatus));
router.get('/confirmed-orders', auth(endPoints.confirmedOrders), asyncHandler(orderController.getConfirmedOrders));
router.patch('/update-delivery-status/:orderId',validation(schema.updateDeliveryStatusSchema),auth(endPoints.updateDliverystatus), asyncHandler(orderController.updateDeliveryStatus));



export default router;