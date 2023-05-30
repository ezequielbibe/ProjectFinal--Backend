import { Router } from "express";
import { authMiddleware } from "../../helpers/index.js";
import { chatControllerGet, chatControllerPost } from "./chatHandler.js";

const chatRouter = Router();

chatRouter.get("/:email", chatControllerGet);
chatRouter.post("/", chatControllerPost);

export default chatRouter;