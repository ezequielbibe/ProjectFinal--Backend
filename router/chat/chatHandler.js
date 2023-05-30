import { updateChat } from "../../controllers/chatsController.js";
import { getChatForEmail, getUserByEmail } from "../../controllers/index.js";
import { logger } from "../../logs/winston.js";

export const chatControllerGet = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (!user || (user.email !== email && req.user.admin === false)) {
      res.render("error", {
        id: email,
        errorMessage: `Recourse solicited is invalid`,
      });
      return;
    }
    if (user.email === email) {
      res.render("chats", { email, author: email });
      return;
    }
    res.render("chats", { email, author: "Admin" });
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const chatControllerPost = async (req, res) => {
  try {
    const { email, message } = req.body;
    const user = await getUserByEmail(email);
    const chat = await getChatForEmail(email);
    const messages = chat.messages;
    console.log(user.email);
    if (!user || !chat || !message) {
      res.render("error", {
        id: email,
        errorMessage: `Recourse solicited is invalid`,
      });
      return;
    }
    if (!req.user.admin) {
      messages.push({
        author: user.email,
        timeStamp: new Date().toLocaleString(),
        text: message,
      });
      await updateChat(email, { ...chat, messages });
      res.json({ message: "Message sended" });
      return;
    }
    messages.push({
      author: "Admin",
      timeStamp: new Date().toLocaleString(),
      text: message,
    });
    await updateChat(email, { ...chat, messages });
    res.json({ message: "Message sended" });
    return;
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};