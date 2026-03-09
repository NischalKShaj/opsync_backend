// file to create the message entity

// interface for the message
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  encryptedMessage: string;
  createdAt: Date;
  updatedAt: Date;
}
