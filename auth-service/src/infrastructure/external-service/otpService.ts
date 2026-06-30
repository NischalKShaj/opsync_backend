// file to call the otp service for the application

// importing the required modules
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class NotificationService {
  private base = process.env.NOTIFICATION_URL;

  // for sending the acknowledgement mail to the owner
  async sendAcknowledgementMail(
    email: string,
    organizationName: string,
    username: string,
  ) {
    const result = await axios.post(
      `${this.base}/notification/email/send-acknowledgement-mail`,
      {
        email,
        organizationName,
        username,
      },
    );
    return result.data;
  }

  // for sending the welcome mail to the employee
  async sendWelcomeMail(
    email: string,
    password: string,
    username: string,
    organizationName: string,
  ) {
    const result = await axios.post(
      `${this.base}/notification/email/send-welcome-mail`,
      {
        email,
        password,
        username,
        organizationName,
      },
    );

    return result.data;
  }

  // for sending the otp
  async sendOTP(email: string, otp: string, type: string) {
    const result = await axios.post(
      `${this.base}/notification/email/send-otp`,
      {
        email,
        otp,
        type,
      },
    );
    return result.data;
  }
}
