// for the repository for the conversation

// importing the required modules
import { IConversationRepository } from "../../domain/interface/IConversationRepository";
import { Conversation } from "../../domain/entities/Conversation";
import { ConversationModel } from "../database/mongodb/models/conversation.model";
import { Message } from "../../domain/entities/Message";
import { MessageModel } from "../database/mongodb/models/message.model";

// class for the conversation repository
export class ConversationRepository implements IConversationRepository {
  // method to get all the conversations for the user
  async getConversationByUserId(userId: string): Promise<Conversation[]> {
    try {
      const result = await ConversationModel.find({
        participants: userId,
      })
        .sort({ updatedAt: -1 })
        .lean();

      const conversations = result.map((conversation) => ({
        id: conversation._id.toString(),
        type: conversation.type,
        participants: conversation.participants,
        name: conversation.name ?? undefined,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      }));

      return conversations;
    } catch (error) {
      throw error;
    }
  }

  // method for getting the both the user and the conversation
  async findConversationByIdAndUser(conversationId: string, userId: string) {
    try {
      const conversation = await ConversationModel.findOne({
        _id: conversationId,
        participants: userId,
      }).lean();

      if (!conversation) return null;

      return {
        id: conversation._id.toString(),
        type: conversation.type,
        participants: conversation.participants,
        name: conversation.name ?? undefined,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  // method for getting a specific conversation by it's id
  async getMessagesByConversationId(
    conversationId: string,
    limit: number,
    cursor?: string,
  ) {
    try {
      const query: any = { conversationId };

      if (cursor) {
        query._id = { $lt: cursor };
      }

      const messages = await MessageModel.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1)
        .lean();

      const hasMore = messages.length > limit;

      if (hasMore) {
        messages.pop();
      }
      const formatted = messages.map((m) => ({
        id: m._id.toString(),
        conversationId: m.conversationId.toString(),
        senderId: m.senderId,
        encryptedMessage: m.encryptedMessage,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      }));

      return {
        messages: formatted.reverse(),
        hasMore,
        nextCursor: formatted.length
          ? formatted[formatted.length - 1].id
          : undefined,
      };
    } catch (error) {
      throw error;
    }
  }

  // for finding any direct message exists
  async findDirectConversation(
    senderId: string,
    receiverId: string,
  ): Promise<Conversation | null> {
    try {
      const result = await ConversationModel.findOne({
        type: "direct",
        participants: {
          $all: [senderId, receiverId],
        },
      }).lean();

      if (!result) return null;

      return {
        id: result._id.toString(),
        type: result.type,
        participants: result.participants,
        name: result.name ?? undefined,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  // for creating new conversation
  async createConversation(
    type: string,
    senderId: string,
    receiverId: string,
  ): Promise<Conversation> {
    try {
      const newConversation = await ConversationModel.create({
        type,
        participants: [senderId, receiverId],
      });

      return {
        id: newConversation._id.toString(),
        type: newConversation.type,
        participants: newConversation.participants,
        createdAt: newConversation.createdAt,
        updatedAt: newConversation.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  // for creating new message
  async createMessage(
    conversationId: string,
    senderId: string,
    message: string,
    messageType: string,
  ): Promise<Message> {
    try {
      const newMessage = await MessageModel.create({
        conversationId,
        senderId,
        encryptedMessage: message,
        messageType,
      });

      return {
        id: newMessage._id.toString(),
        conversationId: newMessage.conversationId.toString(),
        senderId: newMessage.senderId,
        encryptedMessage: newMessage.encryptedMessage,
        createdAt: newMessage.createdAt,
        updatedAt: newMessage.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  // for updating the new last message in the conversation
  async updateLastMessage(
    conversationId: string,
    senderId: string,
    content: string,
  ): Promise<void> {
    try {
      await ConversationModel.findOneAndUpdate(
        { _id: conversationId },
        { $set: { lastMessage: { senderId, content } } },
        { new: true },
      );

      return;
    } catch (error) {
      throw error;
    }
  }
}
