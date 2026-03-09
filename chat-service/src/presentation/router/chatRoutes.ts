// file to create the router for the chat

// importing the required modules
import { Router } from "express";
import { convoController } from "../../config/di";
import { authenticateToken } from "../middleware/auth";

// setting the router
const router = Router();

// for getting the conversation for the user
router.get("/", authenticateToken, convoController.getConversations);

// router for getting the messages by conversation id
router.get("/:id/message", authenticateToken, convoController.getMessages);

// exporting the router
export default router;
