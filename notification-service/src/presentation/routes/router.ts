// file to create the routes for the notification

// importing the required modules
import { Router } from "express";
import { notificationController } from "../../config/di";

const router = Router();

// router for sending the otp as email
router.post("/email/send-otp", notificationController.sendOtpMail);

export default router;
