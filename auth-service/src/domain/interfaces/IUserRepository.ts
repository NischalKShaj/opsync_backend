// creating the interface for the user

// importing the required entities
import { Organization } from "../entities/Organization";
import { User } from "../entities/User";

// exporting the IUser repository
export interface IUserRepository {
  // for finding the user with the email
  findByEmail: (email: string) => Promise<User | null>;

  // for creating the user
  createUser: (user: User) => Promise<User | null>;

  // for updating the user
  updateUser: (user: User) => Promise<User | null>;

  // for finding the organization
  findOrganization: (organization: string) => Promise<Organization | null>;

  // for creating the organization
  createOrganizationWithOwner(data: {
    organization: Organization;
    user: User;
  }): Promise<{
    organization: Organization;
    user: User;
  }>;
}
