// file for the auth controller

// importing the required modules
import { Request, Response } from "express";
import { AuthUseCase } from "../../application/use-cases/AuthUseCase";
import logger from "../../infrastructure/logger/logger";

// creating the auth controller
export class AuthController {
  constructor(private useCase: AuthUseCase) {}

  // for login the user
  login = async (req: Request, res: Response) => {
    try {
      logger.info("Login request received", {
        email: req.body.email,
        password: req.body.password,
        type: typeof req.body.password,
      });
      const result = await this.useCase.login(req.body);
      return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      logger.error("Error during login", {
        error: error.message,
        stack: error.stack,
      });
      if (error instanceof Error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      return res
        .status(500)
        .json({ success: false, error: "something went wrong" });
    }
  };

  // for signup the user
  signup = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const result = await this.useCase.createUser({ email });
      return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      logger.error("Error during signup", {
        error: error.message,
        stack: error.stack,
      });
      if (error instanceof Error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      return res
        .status(500)
        .json({ success: false, error: "something went wrong" });
    }
  };

  // for resending the otp
  resendOTP = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const result = await this.useCase.resendOTP({ email });
      return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      logger.error("Error during resend OTP", {
        error: error.message,
        stack: error.stack,
      });
      if (error instanceof Error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      return res
        .status(500)
        .json({ success: false, error: "something went wrong" });
    }
  };

  // for verifying the otp
  verifyOTP = async (req: Request, res: Response) => {
    try {
      const { email, otp, username, phoneNumber, password, role } = req.body;

      const result = await this.useCase.verifyOTP({
        email,
        otp,
        username,
        phone_number: phoneNumber,
        role,
        password,
      });

      return res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      logger.error("Error during verify OTP", {
        error: error.message,
        stack: error.stack,
      });

      if (error instanceof Error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      return res
        .status(500)
        .json({ success: false, error: "something went wrong" });
    }
  };

  // for user logout
  logout = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      const result = await this.useCase.logout({ refreshToken });
      return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      logger.error("Error during logout", {
        error: error.message,
        stack: error.stack,
      });
    }
  };
}
