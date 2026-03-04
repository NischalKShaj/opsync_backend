// file for the dependency injection for the auth service

// importing the required modules
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { AuthController } from "../presentation/controller/AuthController";
import { AuthUseCase } from "../application/use-cases/AuthUseCase";
import { NotificationService } from "../infrastructure/external-service/otpService";
import { TokenRepository } from "../infrastructure/repositories/TokenRepository";

// creating the di for the auth service
const userRepo = new UserRepository();
const notificationService = new NotificationService();
const tokenRepo = new TokenRepository();
const authUseCase = new AuthUseCase(userRepo, notificationService, tokenRepo);
export const authController = new AuthController(authUseCase);
