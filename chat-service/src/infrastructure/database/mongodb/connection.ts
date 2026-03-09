// file to setup the mongoose for the chat service

// importing the required modules
import mongoose from "mongoose";
import logger from "../../logger/logger";
import dotenv from "dotenv";

dotenv.config();

// setting up the connection to the database
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "invalid url");
  } catch (error: any) {
    logger.error("Error while connecting to MongoDB", {
      error: error.message,
      stack: error.stack,
    });
  }
};
