// file to create the use case for the Otp

// importing the required modules
import { SendOTPMailDTO, EmailOTPServiceDTO } from "../dto/NotificationDTO";
import dotenv from "dotenv";
import { EmailService } from "../../infrastructure/service/emailService";
import { loadTemplate } from "../../infrastructure/service/templateLoader";
dotenv.config();

export class NotificationUseCase {
  constructor(private emailService: EmailService) {}
  // use case for sending the otp as mail
  async sendOtpMail({ email, otp, type }: SendOTPMailDTO) {
    try {
      // logic for sending the mail
      const html = loadTemplate(type, otp);

      // setting up the mail options
      const mailOptions: EmailOTPServiceDTO = {
        from: process.env.EMAIL || "nischalkshaj5@gmail.com",
        to: email,
        subject: "OpSync Verification Code",
        html,
      };
      const result = this.emailService.sendOTP(mailOptions);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
