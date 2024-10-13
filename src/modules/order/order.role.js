import {roles} from "../../Middleware/auth.js"

export const endPoints ={
    create:[roles.User],
    getPendingOrders :[roles.Admin],
    updateOrderStatus:[roles.Admin],
    confirmedOrders:[roles.Delivery],
    updateDliverystatus:[roles.Delivery],
}