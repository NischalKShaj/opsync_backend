// file to create the user entity

// interface for the user
export interface User {
  id: string;
  organization_id?: string;
  username: string;
  email: string;
  password: string;
  must_change_password: boolean;
  role: string;
  designation: string;
  phone_number?: string;
  created_at: Date;
  updated_at: Date;
}
