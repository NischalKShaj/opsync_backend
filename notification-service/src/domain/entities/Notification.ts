// file to create the entity for the otp

// interface for the otp
export interface OTP {
  email: string;
  otp: string;
  expires: Date;
}
