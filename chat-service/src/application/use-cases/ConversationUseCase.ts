// file to create the use case for the conversation

// importing the required modules
import { IConversationRepository } from "../../domain/interface/IConversationRepository";
import { ConversationDTO, MessageDTO, SendMessageDTO } from "../dto/ChatDTO";

// class for the conversation use case
export class ConversationUseCase {
  constructor(private convoRepo: IConversationRepository) {}

  // for getting all the conversations for the user
  async getConversationsById({ user_id }: ConversationDTO) {
    try {
      // returning all the conversations for the user
      const conversations =
        await this.convoRepo.getConversationByUserId(user_id);

      if (!conversations) throw new Error("No conversations found");

      return conversations;
    } catch (error) {
      throw error;
    }
  }

  // for getting the message by conversation id
  async getMessageById({ conversationId, limit, user_id, cursor }: MessageDTO) {
    try {
      // for getting the message by the conversation id
      const conversation = await this.convoRepo.findConversationByIdAndUser(
        conversationId,
        user_id,
      );

      if (!conversation) {
        throw new Error("Unauthorized access to conversation");
      }

      // for getting the message by the conversion id
      return await this.convoRepo.getMessagesByConversationId(
        conversationId,
        limit,
        cursor,
      );
    } catch (error) {
      throw error;
    }
  }

  // for creating new conversation and adding new message
  async sendMessage({
    senderId,
    receiverId,
    message,
    messageType,
  }: SendMessageDTO) {
    try {
      // to check if any previous conversation between the sender and receiver exists
      let conversation = await this.convoRepo.findDirectConversation(
        senderId,
        receiverId,
      );

      // create if no conversation exists
      if (!conversation) {
        const type = "direct";
        conversation = await this.convoRepo.createConversation(
          type,
          senderId,
          receiverId,
        );
      }

      // for saving the message in the conversation
      const latestMessage = await this.convoRepo.createMessage(
        conversation.id,
        senderId,
        message,
        messageType,
      );

      // to update the last message in the conversation
      await this.convoRepo.updateLastMessage(
        conversation.id,
        senderId,
        message,
      );

      return latestMessage;
    } catch (error) {
      throw error;
    }
  }
}
