// file to create a proxy to contact the chat service

// importing the required modules
import { createProxyMiddleware } from "http-proxy-middleware";
import logger from "../../infrastructure/logger/logger";
import dotenv from "dotenv";
dotenv.config();

// creating the proxy for the chat service
export const ChatProxy = createProxyMiddleware({
  target: process.env.CHAT_SERVICE_URL || "http://CHAT_SERVICE_URL:4001",
  changeOrigin: true,
  pathRewrite: (path, req) => {
    logger.info(`Proxying request to Chat Service: ${req.method} ${path}`);
    return `/chat${path}`; // <-- THIS FIXES YOUR PROBLEM
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
