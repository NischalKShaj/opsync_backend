// file to create a proxy to contact the auth service

// importing the required modules
import { createProxyMiddleware } from "http-proxy-middleware";
import logger from "../../infrastructure/logger/logger";
import dotenv from "dotenv";
dotenv.config();

// creating the proxy for the auth service
export const AuthProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL || "http://auth-service:4001",
  changeOrigin: true,
  pathRewrite: (path, req) => {
    logger.info(`Proxying request to Auth Service: ${req.method} ${path}`);
    return `/auth${path}`; // <-- THIS FIXES YOUR PROBLEM
  },

  on: {
    proxyReq: (proxyReq, req) => {
      logger.info(`Proxying ${req.method} ${req.url}`);
    },

    error: (err, req, res: any) => {
      logger.error(`Proxy Error: ${err.message}`);

      res.status(502).json({
        message: "Auth service unavailable",
      });
    },
  },
});
