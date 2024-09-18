import {roles} from "../../Middleware/auth.js"

export const endPoints ={
    create:[roles.Admin,roles.User],
    remove:[roles.Admin,roles.User],
}