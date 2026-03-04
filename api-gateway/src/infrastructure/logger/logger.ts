// file to create the logger for the application

// importing the required modules
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";
import path from "path";

// creating the logs directory if it doesn't exist
const logDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const infoOnly = format((log) => {
  return log.level === "info" ? log : false;
})();

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    // for all the error logs
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      level: "error",
      datePattern: "YYYY-MM-DD",
      maxFiles: "1d",
      zippedArchive: true,
      auditFile: "logs/error-audit.json",
    }),

    // for all the other logs
    new DailyRotateFile({
      filename: "logs/info-%DATE%.log",
      level: "info",
      datePattern: "YYYY-MM-DD",
      maxFiles: "1d",
      zippedArchive: true,
      auditFile: "logs/info-audit.json",
      format: format.combine(infoOnly),
    }),
  ],
});
// for logging in the console during development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

// exporting the logger
export default logger;
