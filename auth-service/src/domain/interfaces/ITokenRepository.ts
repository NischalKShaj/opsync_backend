// file to create the interface for the token repository

// importing the required modules
import { RefreshToken } from "../entities/Token";

// exporting the interface for the token
export interface ITokenRepository {
  // for creating the refresh token
  createToken: (token: RefreshToken) => Promise<RefreshToken | null>;

  // for deleting the refresh token
  deleteToken: (token: string) => Promise<void>;
}
