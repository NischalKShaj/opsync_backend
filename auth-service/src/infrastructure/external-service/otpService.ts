// file to call the otp service for the application

// importing the required modules
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class NotificationService {
  private base = process.env.NOTIFICATION_URL;

  // for sending the otp
  async sendOTP(email: string) {
    const otp = await axios.post(`${this.base}/otp/send-otp`, { email });
    return otp.data;
  }

  // for verifying the otp
  async verifyOTP(email: string, otp: string) {
    const result = await axios.post(`${this.base}/otp/verify-otp`, {
      email,
      otp,
    });
    return result.data;
  }
}
