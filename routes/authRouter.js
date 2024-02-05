import express from "express";
import {handleRegister, handleLogin } from "../controllers/authController.js";
import cloudinarysave from "../middlewares/multercloudinary.js"

const authRouter =  express.Router();

authRouter.post('/register', handleRegister);
authRouter.post('/login', handleLogin);




export default authRouter;