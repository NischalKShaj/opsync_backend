// file to setup the rate limiter for the application

// importing the required modules
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "../../infrastructure/cache/redis";
import { Request, Response, NextFunction } from "express";

// setting up the rate limiter
const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "gateway_rate_limiter",
  points: 1000,
  duration: 60,
});

// setting up the middleware for the ratelimiter
export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || "unknown-ip";
    await rateLimiter.consume(ip);
    next();
  } catch (error) {
    return res.status(429).json({ message: "Too Many Requests" });
  }
};
