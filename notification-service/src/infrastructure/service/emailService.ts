// file to create the email service

// importing the required modules
import createTransport from "nodemailer";
import { EmailOTPServiceDTO } from "../../application/dto/NotificationDTO";

export class EmailService {
  // for sending the otp via email
  async sendOTP(mailOptions: EmailOTPServiceDTO) {
    try {
      // creating the transporter
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
