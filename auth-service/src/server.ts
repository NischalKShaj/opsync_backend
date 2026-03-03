// setting up the server for the auth service

// importing the required modules
import app from "./app";
import dotenv from "dotenv";
import logger from "./infrastructure/logger/logger";

dotenv.config();

// setting up the port for the server
const PORT = process.env.PORT || 3001;

// starting the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
