// setting up the server for the auth service

// importing the required modules
import app from "./app";
import dotenv from "dotenv";
import logger from "./infrastructure/logger/logger";
import { connectMongoDB } from "./infrastructure/database/mongodb/connection";
import http from "http";
import { initSocket } from "./presentation/socket/socket.server";

dotenv.config();

// setting up the port for the server
const PORT = process.env.PORT || 4003;

// function to start the server
async function startServer() {
  await connectMongoDB();

  // for initializing the main server
  const server = http.createServer(app);

  // for initializing the socket server
  initSocket(server);

  // starting the server
  server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

startServer();
