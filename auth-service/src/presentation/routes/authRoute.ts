// setting up the router for the auth service

// importing the required modules
import { Router } from "express";
import { authController } from "../../config/di";

// creating the router
const router = Router();

// router for login
router.post("/login", authController.login);

// router for signup
router.post("/signup", authController.signup);

// for verify the otp and signup the user
router.post("/verify-otp", authController.verifyOTP);

// for resending the otp
router.post("/resend-otp", authController.resendOTP);

// exporting the router
export default router;
