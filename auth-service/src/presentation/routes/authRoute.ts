// setting up the router for the auth service

// importing the required modules
import { Router } from "express";
import { authController } from "../../config/di";

// creating the router
const router = Router();

// router for creating the organization and the owner
router.post("/create-organization", authController.createOrganization);

// router for login
router.post("/login", authController.login);

// router for signing up the employees
router.post("/signup", authController.signup);

// for verify the otp and signup the user
router.post("/verify-otp", authController.verifyOTP);

// for resending the otp
router.post("/resend-otp", authController.resendOTP);

// for logout the user
router.post("/logout", authController.logout);

// exporting the router
export default router;
