// file for the dependency injection for the auth service

// importing the required modules
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { AuthController } from "../presentation/controller/AuthController";
import { AuthUseCase } from "../application/use-cases/AuthUseCase";

// creating the di for the auth service
const userRepo = new UserRepository();
const authUseCase = new AuthUseCase(userRepo);
export const authController = new AuthController(authUseCase);
