// file to create the interface for the conversation repository

// importing the required modules
import { Conversation } from "../entities/Conversation";
import { Message } from "../entities/Message";

// interface for the conversation repository
export interface IConversationRepository {
  // method to get all the conversations for a user
  getConversationByUserId(userId: string | undefined): Promise<Conversation[]>;

  // method to get a specific conversation by it's id
  getMessagesByConversationId(
    conversationId: string,
    limit: number,
    cursor?: string,
  ): Promise<{ messages: Message[]; hasMore: boolean; nextCursor?: string }>;

  // method for getting both the user and the conversation
  findConversationByIdAndUser(
    conversationId: string,
    userId: string | undefined,
  ): Promise<Conversation | null>;

  // for finding if one-one conversation exists
  findDirectConversation(
    senderId: string | undefined,
    receiverId: string,
  ): Promise<Conversation | null>;

  // for creating new conversation
  createConversation(
    type: string,
    senderId: string | undefined,
    receiverId: string,
  ): Promise<Conversation>;

  // for updating the new last message in the conversation
  updateLastMessage(
    conversationId: string,
    senderId: string | undefined,
    content: string,
  ): Promise<void>;

  // method for creating a new conversation
  createMessage(
    conversationId: string,
    senderId: string | undefined,
    message: string,
    messageType: string,
  ): Promise<Message>;
}
