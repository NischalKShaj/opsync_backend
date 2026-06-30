// file to create the use case for the Otp

// importing the required modules
import {
  SendOTPMailDTO,
  EmailServiceDTO,
  SendWelcomeMailDTO,
  SendAckMailDTO,
} from "../dto/NotificationDTO";
import dotenv from "dotenv";
import { EmailService } from "../../infrastructure/service/emailService";
import {
  loadAckMailTemplate,
  loadTemplate,
  loadWelcomeMailTemplate,
} from "../../infrastructure/service/templateLoader";
dotenv.config();

export class NotificationUseCase {
  constructor(private emailService: EmailService) {}
  // use case for sending the otp as mail
  async sendOtpMail({ email, otp, type }: SendOTPMailDTO) {
    try {
      // logic for sending the mail
      const html = loadTemplate(type, otp);

      // setting up the mail options
      const mailOptions: EmailServiceDTO = {
        from: process.env.EMAIL || "nischalkshaj5@gmail.com",
        to: email,
        subject: "OpSync Verification Code",
        html,
      };
      const result = this.emailService.sendMail(mailOptions);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // use case for sending the welcome mail
  async sendWelcomeMail({
    email,
    password,
    username,
    organizationName,
  }: SendWelcomeMailDTO) {
    try {
      const html = loadWelcomeMailTemplate(
        email,
        password,
        username,
        organizationName,
      );

      const mailOptions: EmailServiceDTO = {
        from: process.env.EMAIL || "nischalkshaj5@gmail.com",
        to: email,
        subject: `Your OpSync account for ${organizationName}`,
        html,
      };

      const result = this.emailService.sendMail(mailOptions);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // for sending the acknowledgement mail
  async sendAcknowledgementMail({
    email,
    organizationName,
    username,
  }: SendAckMailDTO) {
    try {
      const html = loadAckMailTemplate(email, username, organizationName);

      const mailOptions: EmailServiceDTO = {
        from: process.env.EMAIL || "nischalkshaj5@gmail.com",
        to: email,
        subject: `${organizationName} has been successfully registered on OpSync`,
        html,
      };

      const result = this.emailService.sendMail(mailOptions);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
