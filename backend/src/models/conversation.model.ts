import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  sender: mongoose.Types.ObjectId;   // User who sent the message
  text: string;
  createdAt: Date;
  readBy: mongoose.Types.ObjectId[]; // Users who read the message
}

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[]; // Users in the conversation
  messages: IMessage[];
  lastMessage?: IMessage;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    messages: [messageSchema],
    lastMessage: messageSchema, 
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1 });
conversationSchema.index({ updatedAt: -1 });

const Conversation = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);

export default Conversation;
