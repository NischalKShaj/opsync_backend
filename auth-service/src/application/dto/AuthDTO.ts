// file to create the dto for the auth service

// interface for login dto
export interface LoginDTO {
  email: string;
  password: string;
}

// interface for signup
export interface SignupDTO {
  username: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
}
