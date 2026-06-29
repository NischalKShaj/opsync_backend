// file to create the user repository

// importing the required modules
import { db } from "../database/knexClient";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";
import logger from "../logger/logger";
import { Organization } from "../../domain/entities/Organization";

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

  // for finding the organization
  async findOrganization(organization: string): Promise<Organization | null> {
    try {
      const result = await db<Organization>("organizations")
        .where("name", organization)
        .first();
      return result || null;
    } catch (error) {
      throw error;
    }
  }

  // for creating the organization and the owner user
  async createOrganizationWithOwner(data: {
    organization: Organization;
    user: User;
  }): Promise<{
    organization: Organization;
    user: User;
  }> {
    try {
      return await db.transaction(async (trx) => {
        // Create organization
        const [organization] = await trx<Organization>("organizations")
          .insert(data.organization)
          .returning("*");

        // Create owner user
        const [user] = await trx<User>("users")
          .insert(data.user)
          .returning("*");

        return {
          organization,
          user,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  // for updating the user
  async updateUser(user: User): Promise<User | null> {
    try {
      logger.info(
        `value from the update use repository ${JSON.stringify(user)}`,
      );
      const [result] = await db<User>("users")
        .where({ id: user.id })
        .update(user)
        .returning("*");
      return result || null;
    } catch (error) {
      throw error;
    }
  }
}
