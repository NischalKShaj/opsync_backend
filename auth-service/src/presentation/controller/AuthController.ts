// file for the auth controller

// importing the required modules
import { Request, Response } from "express";
import { AuthUseCase } from "../../application/use-cases/AuthUseCase";

// creating the auth controller
export class AuthController {
  constructor(private useCase: AuthUseCase) {}

  login = async (req: Request, res: Response) => {
    try {
      console.log("here");
      console.log("req body", req.body);
      const result = await this.useCase.login(req.body);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Error from login controller:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  };
}
