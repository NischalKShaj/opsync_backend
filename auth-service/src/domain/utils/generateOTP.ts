// file to generate OTP

// importing the required modules
import crypto from "crypto";

// function for generating OTP
export const generateOTP = (length = 6): string => {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
};
