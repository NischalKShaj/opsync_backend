// file to create the notification controller

// importing the required modules
import { Request, Response } from "express";
import { NotificationUseCase } from "../../application/use-cases/NotificationUseCase";
import logger from "../../infrastructure/logger/logger";

export class NotificationController {
  constructor(private notificationUseCase: NotificationUseCase) {}

  // for sending the otp via email
  sendOtpMail = async (req: Request, res: Response) => {
    try {
      const { email, otp, type } = req.body;
      // logic for sending the mail
      const result = await this.notificationUseCase.sendOtpMail({
        email,
        otp,
        type,
      });
      return res.status(200).json(result);
    } catch (error: any) {
      logger.error("Error while sending the OTP via mail", {
        error: error.message,
        stack: error.stack,
      });
      if (error instanceof Error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      return res
        .status(500)
        .json({ success: false, error: "something went wrong" });
    }
  };

  // for sending the welcome message via email
  sendWelcomeMail = async (req: Request, res: Response) => {
    try {
      const { email, password, username, organizationName } = req.body;
      // logic for sending the mail
      const result = await this.notificationUseCase.sendWelcomeMail({
        email,
        password,
        username,
        organizationName,
      });
      return res.status(200).json(result);
    } catch (error: any) {
      logger.error("Error while sending the Welcome message via mail", {
        error: error.message,
        stack: error.stack,
      });
      if (error instanceof Error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      return res
        .status(500)
        .json({ success: false, error: "something went wrong" });
    }
  };

  // for sending the acknowledgement mail to organization creator
  sendAcknowledgementMail = async (req: Request, res: Response) => {
    try {
      const { email, organizationName, username } = req.body;

      const result = await this.notificationUseCase.sendAcknowledgementMail({
        email,
        organizationName,
        username,
      });
      return res.status(200).json(result);
    } catch (error: any) {
      logger.error("Error while sending the Welcome message via mail", {
        error: error.message,
        stack: error.stack,
      });
      if (error instanceof Error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      return res
        .status(500)
        .json({ success: false, error: "something went wrong" });
    }
  };
}
