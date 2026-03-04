// file for the server configuration

// importing the required modules
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import corsOption from "./config/cors";
import { rateLimiterMiddleware } from "./presentation/middleware/rateLimiter";

dotenv.config();

// importing the proxies
import { AuthProxy } from "./presentation/proxy/auth.proxy";

// setting up the app
const app = express();

// for load balancing
app.set("trust proxy", true);

// setting up the global middlewares
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("dev"));

// setting up the rate limiter middleware
app.use(rateLimiterMiddleware);

// set up the api gateways
app.use("/auth", AuthProxy);

// setting up the body parser
app.use(express.json());

// importing the app
export default app;
