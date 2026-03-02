// file to create the user repository

// importing the required modules
import { db } from "../database/knexClient";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";

// creating the user repository
export class UserRepository implements IUserRepository {
  // for user login
  async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await db<User>("users").where({ email }).first();
      return result || null;
    } catch (error) {
      throw error;
    }
  }

  // for user signup
  async createUser(user: User): Promise<User | null> {
    try {
      const [result] = await db<User>("users").insert(user).returning("*");
      return result || null;
    } catch (error) {
      throw error;
    }
  }
}
