// file to create the schema and model for the conversation collection in mongodb

// importing the required modules
import mongoose from "mongoose";

// setting up the schema
const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["direct", "group"],
      required: true,
    },

    participants: [{ type: String, required: true }],

    name: { type: String },

    adminIds: [{ type: String }],

    lastMessage: {
      senderId: String,
      content: String,
      createdAt: Date,
    },
  },
  { timestamps: true },
);

conversationSchema.index(
  { participants: 1, type: 1 },
  { unique: true, partialFilterExpression: { type: "direct" } },
);

export const ConversationModel = mongoose.model(
  "Conversation",
  conversationSchema,
);
