// file to create the dto for the otp part

// interface for sending the otp via mail
export interface SendOTPMailDTO {
  email: string;
  otp: string;
  type: "signup" | "password-reset";
}

// interface for the email otp service
export interface EmailOTPServiceDTO {
  from: string;
  to: string;
  html: string;
  subject: string;
}
