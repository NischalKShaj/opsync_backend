// file to setup the redis for the chat service

// importing the required modules
import { createClient } from "redis";
import dotenv from "dotenv";
import logger from "../logger/logger";

dotenv.config();

export const pubClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export const subClient = pubClient.duplicate();

export const connectRedis = async () => {
  pubClient.on("error", (error: any) =>
    logger.error("Redis Pub Error", {
      error: error.message,
      stack: error.stack,
    }),
  );

  subClient.on("error", (error: any) => {
    logger.error("Redis Sub Error", {
      error: error.message,
      stack: error.stack,
    });
  });

  await pubClient.connect();
  await subClient.connect();

  logger.info("Redis connected ✅");
};
