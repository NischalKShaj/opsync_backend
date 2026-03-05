// file to create the jwt service

// importing the required modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// creating the class for the JWT service
export class JwtService {
  // creating the access token
  static generateAccessToken(userId: string | undefined, role: string) {
    return jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_KEY!, {
      expiresIn: "15m",
    });
  }

  // creating the refresh token
  static generateRefreshToken(userId: string | undefined, role: string) {
    return jwt.sign({ userId, role }, process.env.REFRESH_TOKEN_KEY!, {
      expiresIn: "7d",
    });
  }
}
