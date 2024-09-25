import {roles} from "../../Middleware/auth.js"

export const endPoints ={
    create:[roles.Admin,roles.User],
    remove:[roles.Admin,roles.User],
    clear:[roles.Admin,roles.User],
    //increase:[roles.Admin,roles.User],
    //decrease:[roles.Admin,roles.User],
    update:[roles.Admin,roles.User],
    get:[roles.Admin,roles.User],
}