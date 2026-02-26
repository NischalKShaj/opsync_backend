// file to create the interface for the otp

// importing the required modules
import { OTP } from "../entities/Notification";

export interface INotificationRepository {
  // interface for the creating otp
  CreateOTP(email: string): Promise<OTP>;

  // interface for the verifying otp
  VerifyOTP(email: string, otp: string): Promise<boolean>;
}
