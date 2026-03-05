// file to create the server for the notification service

// importing the required modules
import app from "./app";
import dotenv from "dotenv";
import logger from "./infrastructure/logger/logger";

dotenv.config();

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  logger.info(`Notification Service running on port ${PORT}`);
});
