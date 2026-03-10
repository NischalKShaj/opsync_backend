// file to create the message modal and schema

// importing the required modules
import mongoose from "mongoose";

// setting up the schema
const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    encryptedMessage: {
      type: String,
      required: true,
    },

    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },

    readBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

messageSchema.index({ conversationId: 1, createdAt: -1 });

export const MessageModel = mongoose.model("Message", messageSchema);
