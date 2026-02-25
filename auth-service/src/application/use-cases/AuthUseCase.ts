// file for the auth use case

// importing the required modules
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { LoginDTO } from "../dto/AuthDTO";
import { PasswordHasher } from "../../infrastructure/security/PasswordHasher";
import { JwtService } from "../../infrastructure/security/JwtService";

// creating the class for the auth use case
export class AuthUseCase {
  constructor(private repo: IUserRepository) {}

  async login({ email, password }: LoginDTO) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const match = await PasswordHasher.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    return {
      accessToken: JwtService.generateAccessToken(user.id, user.role),
      refreshToken: JwtService.generateRefreshToken(user.id, user.role),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
