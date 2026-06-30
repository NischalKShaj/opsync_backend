// file to create the dto for the otp part

// interface for sending the otp via mail
export interface SendOTPMailDTO {
  email: string;
  otp: string;
  type: "signup" | "password-reset";
}

// interface for sending the welcome mail
export interface SendWelcomeMailDTO {
  email: string;
  password: string;
  username: string;
  organizationName: string;
}

// interface for the email otp service
export interface EmailServiceDTO {
  from: string;
  to: string;
  html: string;
  subject: string;
}

// interface for the acknowledgement mail
export interface SendAckMailDTO {
  email: string;
  organizationName: string;
  username: string;
}
