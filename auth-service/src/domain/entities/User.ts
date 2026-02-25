// file to create the user entity

// interface for the user
export interface User {
  id?: string;
  email: string;
  password: string;
  username: string;
  phone_number: string;
  role: string;
  created_at: Date;
}
