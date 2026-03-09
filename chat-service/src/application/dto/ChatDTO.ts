// file to set up the dto for the chat

// interface to get all the conversations of a user
export interface ConversationDTO {
  user_id?: string;
}

// interface to get a specific conversation by it's id
export interface MessageDTO {
  conversationId: string;
  limit: number;
  user_id?: string;
  cursor?: string;
}

// interface for sending a message
export interface SendMessageDTO {
  senderId?: string;
  receiverId: string;
  message: string;
  messageType: string;
}
