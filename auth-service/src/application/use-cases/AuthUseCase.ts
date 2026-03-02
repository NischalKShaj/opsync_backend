// file for the auth use case

// importing the required modules
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { LoginDTO, OTPSignupDTO, SignupDTO } from "../dto/AuthDTO";
import { PasswordHasher } from "../../infrastructure/security/PasswordHasher";
import { JwtService } from "../../infrastructure/security/JwtService";
import { generateOTP } from "../../domain/utils/generateOTP";
import redis from "../../config/redis";
import { NotificationService } from "../../infrastructure/external-service/otpService";

// creating the class for the auth use case
export class AuthUseCase {
  constructor(
    private repo: IUserRepository,
    private notification: NotificationService,
  ) {}

  // for login the user
  async login({ email, password }: LoginDTO) {
    try {
      // check if the user exists or not
      const user = await this.repo.findByEmail(email);
      if (!user) throw new Error("Invalid email or password");

      // check if the passwords match or not
      const match = await PasswordHasher.compare(password, user.password);
      if (!match) throw new Error("Invalid email or password");

      return {
        accessToken: JwtService.generateAccessToken(user.id, user.role),
        refreshToken: JwtService.generateRefreshToken(user.id, user.role),
        user: {
          id: user.id,
          email: user.email,
          name: user.username,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // for creating the otp for the new user
  async createUser({ email }: OTPSignupDTO): Promise<string> {
    try {
      // check if the user already exist or not
      const existingUser = await this.repo.findByEmail(email);

      if (existingUser) throw new Error("User with same email already exists");

      // function for generating OTP
      const otp = generateOTP(6);

      // storing the otp in redis for 5 minutes
      await redis.setEx(`otp:signup:${email}`, 300, otp);

      // sending the otp
      await this.notification.sendOTP(email, otp, "signup");

      return "OTP sent successfully";
    } catch (error) {
      throw error;
    }
  }

  // for resending the otp
  async resendOTP({ email }: OTPSignupDTO) {
    try {
      // for setting the rate limiter for the resend logic
      const cooldownKey = `otp:cooldown:${email}`;

      const cooldown = await redis.get(cooldownKey);

      if (cooldown)
        throw new Error("Please wait before requesting another OTP");

      // delete the old otp from redis
      await redis.del(`otp:signup:${email}`);

      // generate new otp
      const otp = generateOTP(6);

      // storing new otp in redis
      await redis.setEx(`otp:signup:${email}`, 300, otp);

      // setting the rate limiter for 45 seconds
      await redis.setEx(cooldownKey, 45, "1");

      // sending the otp as mail to the user
      await this.notification.sendOTP(email, otp, "signup");

      return "OTP sent successfully";
    } catch (error) {
      throw error;
    }
  }

  // async verify and create the user
  async verifyOTP({
    email,
    otp,
    username,
    phone_number,
    role,
    password,
  }: SignupDTO) {
    try {
      // check if the otp is valid and present
      const storedOtp = await redis.get(`otp:signup:${email}`);

      if (!storedOtp) throw new Error("OTP expired");

      // if the entered otp and stored are same
      if (storedOtp !== otp) throw new Error("Invalid OTP");

      // removing from redis after verification
      await redis.del(`otp:signup:${email}`);

      // hashing the password
      const hashPassword = await PasswordHasher.hash(password);

      await this.repo.createUser({
        username,
        email,
        password: hashPassword,
        phone_number,
        role: role,
        created_at: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }
}
