// setting up the server for the auth service

// importing the required modules
import app from "./app";
import dotenv from "dotenv";
import logger from "./infrastructure/logger/logger";
import { connectMongoDB } from "./infrastructure/database/mongodb/connection";

dotenv.config();

// setting up the port for the server
const PORT = process.env.PORT || 4003;

// function to start the server
async function startServer() {
  await connectMongoDB();

  // starting the server
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

startServer();
