// file to set up the redis for the application

// importing the required modules
import { createClient } from "redis";

// setting the url
const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

redis.connect();

export default redis;
