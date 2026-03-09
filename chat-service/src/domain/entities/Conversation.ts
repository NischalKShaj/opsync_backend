// file to create the conversation entity

// interface to get all the conversations of a user
export interface Conversation {
  id: string;
  participants: string[];
  type: "direct" | "group";
  name?: string;
  adminIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}
