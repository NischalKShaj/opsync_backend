// file to create the password hasher

// importing the required modules
import bcrypt from "bcryptjs";

// creating the class for the hashing
export class PasswordHasher {
  // creating the compare method
  static async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }

  // creating the hash method
  static async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }
}
