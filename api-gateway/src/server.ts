// creating the central server for the application

// importing the required modules
import app from "./app";
import dotenv from "dotenv";
import logger from "./infrastructure/logger/logger";

dotenv.config();

// setting up the port
const port = process.env.PORT || 3000;

// starting the server
app.listen(port, () => {
  logger.info(`Main server running on port ${port}`);
});
