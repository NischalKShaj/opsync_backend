// file to call the otp service for the application

// importing the required modules
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class NotificationService {
  private base = process.env.NOTIFICATION_URL;

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
