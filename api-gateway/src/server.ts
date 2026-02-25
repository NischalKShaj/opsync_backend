// creating the central server for the application

// importing the required modules
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

// setting up the port
const port = process.env.PORT || 3000;

// starting the server
app.listen(port, () => {
  console.log(`Main server running on port: ${port}`);
});
