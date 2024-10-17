import { Router } from "express";
const router=Router();
import * as authController from './auth.controller.js';
import validation from "../../Middleware/validation.js";
import { forgotPasswordSchema, loginSchema, registerSchema, sendCodeSchema } from "./auth.validation.js";
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload from "../../Utils/multer.js";


const upload = fileUpload().single('image');
router.post('/register',upload,validation(registerSchema), asyncHandler(authController.Register)) ;
router.post('/login',validation(loginSchema),asyncHandler(authController.Login));
router.put('/sendCode',validation(sendCodeSchema),asyncHandler(authController.sendCode));
router.put('/forgotpassword',validation(forgotPasswordSchema),asyncHandler(authController.forgotpassword));
router.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail));
export default router;