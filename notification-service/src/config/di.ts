// file to set up the dependency injection

// importing the required modules
import { NotificationUseCase } from "../application/use-cases/NotificationUseCase";
import { EmailService } from "../infrastructure/service/emailService";
import { NotificationController } from "../presentation/controller/NotificationController";

const emailService = new EmailService();
const notificationUseCase = new NotificationUseCase(emailService);
export const notificationController = new NotificationController(
  notificationUseCase,
);
