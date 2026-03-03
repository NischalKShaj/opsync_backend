// file to set up the redis for the application

// importing the required modules
import { createClient } from "redis";
import logger from "../infrastructure/logger/logger";

// setting the url
const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redis.on("error", (err) => {
  logger.error("Redis Client Error", { error: err.message, stack: err.stack });
});

redis.on("connect", () => {
  logger.info("✅ Redis Connected");
});

redis.connect();

export default redis;
