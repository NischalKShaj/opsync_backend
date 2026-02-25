// file for the auth controller

// importing the required modules
import { Request, Response } from "express";
import { AuthUseCase } from "../../application/use-cases/AuthUseCase";

// creating the auth controller
export class AuthController {
  constructor(private useCase: AuthUseCase) {}

  // for login the user
  login = async (req: Request, res: Response) => {
    try {
      const result = await this.useCase.login(req.body);
      return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error from login controller:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  };

  // for signup the user
  signup = async (req: Request, res: Response) => {
    try {
      const { email, username, phoneNumber, password, role } = req.body;
      const result = await this.useCase.createUser({
        email,
        username,
        password,
        phone_number: phoneNumber,
        role,
      });
      return res
        .status(201)
        .json({ success: true, data: "user created successfully" });
    } catch (error: any) {
      console.error("error from the signup controller", error);
      res.status(500).json({ success: false, error: error.message });
    }
  };
}
