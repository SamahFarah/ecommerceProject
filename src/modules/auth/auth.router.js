import { Router } from "express";
const router=Router();
import * as authController from './auth.controller.js';
import { asyncHandler } from "../../Utils/catchError.js";
import fileUpload, { fileType } from "../../Utils/multer.js";
import { auth } from "../../Middleware/auth.js";
import validation from "../../Middleware/validation.js";
import * as schema from './auth.validation.js'
import { endPoints } from "./auth.role.js";

const upload = fileUpload(fileType.image).single('image');
router.post('/register',upload,validation(schema.registerSchema), asyncHandler(authController.Register)) ;
router.post('/Excel',fileUpload(fileType.excel).single('excel'),auth(endPoints.addUserExcel),asyncHandler(authController.addUserExcel));
router.post('/login',validation(schema.loginSchema),asyncHandler(authController.Login));
router.put('/sendCode',validation(schema.sendCodeSchema),asyncHandler(authController.sendCode));
router.put('/forgotpassword',validation(schema.forgotPasswordSchema),asyncHandler(authController.forgotpassword));
router.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail));
export default router;