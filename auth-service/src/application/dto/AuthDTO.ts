// file to create the dto for the auth service

// interface for login dto
export interface LoginDTO {
  email: string;
  password: string;
}

// interface for signup the user and gen the otp
export interface OTPSignupDTO {
  email: string;
  otp: string;
}

// interface for the otp signup
export interface SignupDTO {
  email: string;
  username: string;
  phone_number: string;
  password: string;
  role: string;
  organizationName: string;
  designation: string;
}

// interface for the logout
export interface LogoutDTO {
  refreshToken: string;
}

export interface CreateOrganizationDTO {
  organization: string;
  name: string;
  email: string;
  password: string;
}
