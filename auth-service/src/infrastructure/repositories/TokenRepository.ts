// file to create the token repository

// importing the  required modules
import { db } from "../database/knexClient";
import { ITokenRepository } from "../../domain/interfaces/ITokenRepository";
import { RefreshToken } from "../../domain/entities/Token";

// creating the token repository
export class TokenRepository implements ITokenRepository {
  // for creating the refresh token
  async createToken(token: RefreshToken): Promise<RefreshToken | null> {
    try {
      const [result] = await db<RefreshToken>("refresh_tokens")
        .insert(token)
        .returning("*");
      return result || null;
    } catch (error) {
      throw error;
    }
  }

  // for deleting the refresh token
  async deleteToken(token: string): Promise<void> {
    try {
      await db<RefreshToken>("refresh_tokens").where("token", token).del();
    } catch (error) {
      throw error;
    }
  }
}
