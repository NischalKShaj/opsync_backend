// file to create the email service

// importing the required modules
import createTransport from "nodemailer";
import { EmailOTPServiceDTO } from "../../application/dto/NotificationDTO";
import logger from "../logger/logger";
import dotenv from "dotenv";
dotenv.config();

export class EmailService {
  // for sending the otp via email
  async sendOTP(mailOptions: EmailOTPServiceDTO) {
    try {
      // creating the transporter
      logger.info("email,password", process.env.EMAIL, process.env.PASSWORD);
      const transporter = createTransport.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
      });

      // sending the mail
      await transporter.sendMail(mailOptions);

      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}
