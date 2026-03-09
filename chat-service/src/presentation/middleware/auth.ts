// file to create the middleware for the token validation

// importing the required modules
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../../infrastructure/logger/logger";
import dotenv from "dotenv";
import { JwtUserPayload } from "../../types/JwtPayload";

dotenv.config();

// setting up the middleware function
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY as string,
    ) as JwtUserPayload;

    req.user = decoded;
    next();
  } catch (error: any) {
    logger.error("Error while authenticating token", {
      error: error.message,
      stack: error.stack,
    });
    return res.status(401).json({ message: "Invalid token" });
  }
};
