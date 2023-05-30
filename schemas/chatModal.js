import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chatSchema = new Schema({
  email: { type: String, required: true },
  messages: { type: Array, required: true },
});

const Chats = model("Chat", chatSchema);

export default Chats;