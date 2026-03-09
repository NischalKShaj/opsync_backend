// file to set up the socket server for the chat service

// importing the required modules
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { AuthenticatedSocket } from "./socket.types";
import { registerMessageHandler } from "./handlers/message.handler";
import logger from "../../infrastructure/logger/logger";
import { ConversationRepository } from "../../infrastructure/repository/ConversationRepository";
import { ConversationUseCase } from "../../application/use-cases/ConversationUseCase";

const convoRepo = new ConversationRepository();
const convoUseCase = new ConversationUseCase(convoRepo);

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // auth middleware
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const decoded: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY as string,
      );

      socket.userId = decoded.userId;

      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  // for establishing the connection
  io.on("connection", async (socket: AuthenticatedSocket) => {
    const userId = socket?.userId;
    logger.info("User connected", { userId: socket.userId });
    try {
      // load all the conversations for the user
      const conversations = await convoUseCase.getConversationsById({
        user_id: userId,
      });

      conversations.forEach((cv) => {
        socket.join(cv.id);
      });
    } catch (error: any) {
      logger.error("Failed to join user conversations", {
        error: error.message,
        stack: error.stack,
      });
    }
    registerMessageHandler(io, socket, convoUseCase);

    socket.on("disconnect", () => {
      logger.info("User disconnected", { userId: socket.userId });
    });
  });
};
