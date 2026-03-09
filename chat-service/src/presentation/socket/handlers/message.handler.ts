// file for the message handler

// importing the required modules
import { Server } from "socket.io";
import { AuthenticatedSocket } from "../socket.types";
import logger from "../../../infrastructure/logger/logger";
import { ConversationUseCase } from "../../../application/use-cases/ConversationUseCase";

// setting up the handler
export const registerMessageHandler = (
  io: Server,
  socket: AuthenticatedSocket,
  convoUseCase: ConversationUseCase,
) => {
  // for sending the message
  socket.on("sendMessage", async (data) => {
    try {
      const { receiverId, message, messageType } = data;

      if (!receiverId || !message) {
        socket.emit("error", { message: "Invalid payload" });
        return;
      }

      const senderId = socket.userId;

      const savedMessage = await convoUseCase.sendMessage({
        senderId,
        receiverId,
        message,
        messageType,
      });
      socket.join(savedMessage.conversationId);

      io.to(savedMessage.conversationId).emit("newMessage", savedMessage);
    } catch (err) {
      logger.error("Send message error", { err });

      socket.emit("error", {
        message: "Failed to send message",
      });
    }
  });
};
