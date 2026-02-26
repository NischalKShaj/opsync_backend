// file to create the dto for the otp part

// interface for creating and sending the otp
export interface CreateOTP {
  email: string;
}

// interface for verifying the otp
export interface VerifyOTP {
  email: string;
  otp: string;
}
