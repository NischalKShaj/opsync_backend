// file to setup the rate limiter for the application

// importing the required modules
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "../../infrastructure/cache/redis";
import { Request, Response, NextFunction } from "express";
import logger from "../../infrastructure/logger/logger";

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
  } catch (error: any) {
    logger.error("rate limiter error", {
      error: error.message,
      stack: error.stack,
    });

    if (error?.msBeforeNext) {
      return res.status(429).json({
        message: "Too Many Requests",
        retryAfter: Math.ceil(error.msBeforeNext / 1000),
      });
    }
    next();
  }
};
