import {roles} from "../../Middleware/auth.js"

export const endPoints ={
    create:[roles.Admin],
    delete:[roles.Admin],
    update:[roles.Admin],

}