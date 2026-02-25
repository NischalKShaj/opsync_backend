// file to create the user repository

// importing the required modules
import { db } from "../database/knexClient";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";

// creating the user repository
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db<User>("users").where({ email }).first();
    return result || null;
  }
}
