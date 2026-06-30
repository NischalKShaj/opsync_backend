// file to create the routes for the notification

// importing the required modules
import { Router } from "express";
import { notificationController } from "../../config/di";

const router = Router();

// router for sending the otp as email
router.post("/email/send-otp", notificationController.sendOtpMail);

// router for sending the welcome email
router.post("/email/send-welcome-mail", notificationController.sendWelcomeMail);

// router for sending the acknowledgement mail to organization creator
router.post(
  "/email/send-acknowledgement-mail",
  notificationController.sendAcknowledgementMail,
);

export default router;
