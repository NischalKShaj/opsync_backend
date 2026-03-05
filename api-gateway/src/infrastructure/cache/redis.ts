// file to establish connection to redis

// importing the required modules
import Redis from "ioredis";
import logger from "../logger/logger";
import dotenv from "dotenv";
dotenv.config();

// setting the url
const redis = new Redis(process.env.REDIS_URL || "redis://redis:6379");

redis.on("error", (err) => {
  logger.error("Redis Client Error", {
    error: err.message,
    stack: err.stack,
  });
});

redis.on("ready", () => {
  logger.info("✅ Redis Ready");
});

export default redis;
