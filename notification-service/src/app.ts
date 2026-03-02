// src/app.ts

// importing the required modules
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

// importing the routes
import notificationRoutes from "./presentation/routes/router";

// creating the express app
const app = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(morgan("dev"));

// Routes
app.use("/notification", notificationRoutes);

export default app;
