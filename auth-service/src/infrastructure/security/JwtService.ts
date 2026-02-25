// file to create the jwt service

// importing the required modules
import jwt from "jsonwebtoken";

// creating the class for the JWT service
export class JwtService {
  // creating the access token
  static generateAccessToken(userId: string, role: string) {
    return jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });
  }

  // creating the refresh token
  static generateRefreshToken(userId: string, role: string) {
    return jwt.sign({ userId, role }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });
  }
}
