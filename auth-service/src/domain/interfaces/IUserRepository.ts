// creating the interface for the user

// importing the required entities
import { User } from "../entities/User";

// exporting the IUser repository
export interface IUserRepository {
  // for finding the user with the email
  findByEmail: (email: string) => Promise<User | null>;

  // for creating the user
  createUser: (user: User) => Promise<User | null>;
}
