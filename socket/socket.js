import { getChatForEmail, updateChat } from "../controllers/chatsController.js";
import { logger } from "../logs/winston.js";

export const socket = async (client) => {
  try {
    console.log(`${client.id} is connected`);
    const url = client.handshake.headers.referer;
    const parts = url.split("/");
    const email = parts.pop();
    const chat = await getChatForEmail(email);
    client.emit("messageToChat", chat.messages);

    client.on("addMessage", async (data) => {
      try {
        console.log("a");
        client.emit("messageToChat", messagesActualizated);
      } catch (error) {
        console.log(`We has problems: ${error}`);
      }
    });
  } catch (error) {
    logger.error(`We has problems: ${error}`);
  }
};