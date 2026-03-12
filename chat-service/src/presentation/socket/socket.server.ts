// file to set up the socket server for the chat service

// importing the required modules
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { AuthenticatedSocket } from "./socket.types";
import { registerMessageHandler } from "./handlers/message.handler";
import logger from "../../infrastructure/logger/logger";
import { ConversationRepository } from "../../infrastructure/repository/ConversationRepository";
import { ConversationUseCase } from "../../application/use-cases/ConversationUseCase";
import { createAdapter } from "@socket.io/redis-adapter";
import {
  pubClient,
  subClient,
  connectRedis,
} from "../../infrastructure/redis/redis";
import {
  addUserSocket,
  removeUserSocket,
  isUserOnline,
} from "./handlers/presence.handler";

const convoRepo = new ConversationRepository();
const convoUseCase = new ConversationUseCase(convoRepo);

export const initSocket = async (httpServer: any) => {
  await connectRedis();

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.adapter(createAdapter(pubClient, subClient));

  // auth middleware
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.token;
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
    const userId = socket?.userId as string;
    logger.info("User connected", { userId });

    // join personal room
    socket.join(`user:${userId}`);

    const wasOnline = await isUserOnline(userId);

    await addUserSocket(userId, socket.id);

    if (!wasOnline) {
      io.emit("userOnline", { userId });
    }

    registerMessageHandler(io, socket, convoUseCase);

    // join conversation dynamically
    socket.on("joinConversation", ({ conversationId }) => {
      socket.data.activeConversation = conversationId;
      socket.join(conversationId);
    });

    socket.on("leaveConversation", ({ conversationId }) => {
      socket.data.activeConversation = null;
      socket.leave(conversationId);
    });

    socket.on("disconnect", async () => {
      await removeUserSocket(userId, socket.id);

      const stillOnline = await isUserOnline(userId);

      if (!stillOnline) {
        io.emit("userOffline", { userId });
      }

      logger.info("User disconnected", { userId });
    });
  });
};
