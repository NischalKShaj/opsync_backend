// file to create the dto for the auth service

// interface for login dto
export interface LoginDTO {
  email: string;
  password: string;
}

// interface for signup the user and gen the otp
export interface OTPSignupDTO {
  email: string;
}

// interface for the otp signup
export interface SignupDTO {
  email: string;
  otp: string;
  username: string;
  phone_number: string;
  password: string;
  role: string;
}
