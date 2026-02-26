// file to create the repository for the otp

// importing the required modules
import { OTP } from "../../domain/entities/Notification";
import { INotificationRepository } from "../../domain/interfaces/INotificationRepository";

export class NotificationRepository implements INotificationRepository {
  // for saving the created otp in the db
  async create(email: string, otp: string): Promise<OTP> {
    // saving the otp
    
    return { email, otp };
  }
}
