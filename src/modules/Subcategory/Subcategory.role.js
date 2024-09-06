import {roles} from "../../Middleware/auth.js"

export const endPoints ={
    create:[roles.Admin],
    update:[roles.Admin],
    delete:[roles.Admin],


}