// file to create the notification controller

// importing the required modules
import { Request, Response } from "express";
import { NotificationUseCase } from "../../application/use-cases/NotificationUseCase";

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
    } catch (error) {
      console.error("error", error);
      if (error instanceof Error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      return res
        .status(500)
        .json({ success: false, error: "something went wrong" });
    }
  };
}
