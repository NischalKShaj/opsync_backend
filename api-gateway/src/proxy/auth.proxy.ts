// file to create a proxy to contact the auth service

// importing the required modules
import { createProxyMiddleware } from "http-proxy-middleware";

// creating the proxy for the auth service
export const AuthProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
  changeOrigin: true,
});
