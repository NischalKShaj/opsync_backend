// file to create the controller for the conversation

// importing the required modules
import { Request, Response } from "express";
import { ConversationUseCase } from "../../application/use-cases/ConversationUseCase";
import logger from "../../infrastructure/logger/logger";

// class for the conversation controller
export class ConversationController {
  constructor(private convoUseCase: ConversationUseCase) {}

  // for getting all the conversations for the user
  getConversations = async (req: Request, res: Response) => {
    try {
      const user_id = req.user?.userId;
      logger.info("Getting the user id from the token", { id: user_id });

      const result = await this.convoUseCase.getConversationsById({ user_id });

      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      logger.error("Error while getting conversations by user id", {
        error: error.message,
        stack: error.stack,
      });

      res.status(500).json({ success: false, message: error.message });
    }
  };

  getMessages = async (req: Request, res: Response) => {
    try {
      const user_id = req.user?.userId;
      const conversationId = req.params.id as string;
      const limit = parseInt(req.query.limit as string, 10);
      const cursor = req.query.cursor as string | undefined;

      // for getting the message by conversation id
      const result = await this.convoUseCase.getMessageById({
        conversationId,
        limit,
        user_id,
        cursor,
      });

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      logger.error("Error while getting messages by conversation id", {
        error: error.message,
        stack: error.stack,
      });

      res.status(500).json({ success: false, message: error.message });
    }
  };

  // for creating new group conversation
  createGroupChat = async (req: Request, res: Response) => {
    try {
      const adminId = req.user?.userId as string;
      const { participants, name } = req.body;

      // for creating the group conversation
      const result = await this.convoUseCase.createGroupConversation({
        adminId,
        participants,
        name,
      });

      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      logger.error("Error while creating group chat", {
        error: error.message,
        stack: error.stack,
      });
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}
