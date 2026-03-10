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
      const { conversationId, receiverId, message, messageType } = data;

      if (!message || !messageType) {
        socket.emit("error", { message: "Invalid payload" });
        return;
      }

      const senderId = socket.userId;

      // saving the message in the backend
      const savedMessage = await convoUseCase.sendMessage({
        senderId,
        receiverId,
        conversationId,
        message,
        messageType,
      });

      const { latestMessage, conversation_id, participants } = savedMessage;

      // for sending the message
      io.to(conversation_id).emit("newMessage", latestMessage);

      //  for the notification service
      participants
        .filter((userId: string) => userId != senderId)
        .forEach((userId: string) => {
          io.to(`user:${userId}`).emit("messageNotification", {
            conversation_id,
            senderId,
            message: latestMessage.encryptedMessage,
          });
        });
    } catch (err) {
      logger.error("Send message error", { err });

      socket.emit("error", {
        message: "Failed to send message",
      });
    }
  });

  // for marking that the message is read
  socket.on("readMessage", async ({ conversationId }) => {
    try {
      const userId = socket.userId as string;

      // for validating the message
      if (!conversationId) {
        socket.emit("error", { message: "Invalid payload" });
        return;
      }

      // for marking the message as read
      await convoUseCase.markConversationAsSeen({ conversationId, userId });

      // emitting the event
      io.to(conversationId).emit("messagesRead", { conversationId, userId });
    } catch (error: any) {
      logger.error("Error while marking message as read", {
        error: error.message,
        stack: error.stack,
      });
    }
  });
};
