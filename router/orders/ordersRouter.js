import { Router } from "express";
import { authMiddleware } from "../../helpers/index.js";
import {
  ordersControllerGet,
  ordersControllerGetForEmail,
  ordersControllerGetForStatus,
  ordersControllerPost,
  ordersControllerPut,
} from "./ordersHandler.js";

const ordersRouter = Router();

ordersRouter.get("/:id?", authMiddleware, ordersControllerGet);
ordersRouter.get("/email/:email", authMiddleware, ordersControllerGetForEmail);
ordersRouter.get(
  "/status/:status",
  authMiddleware,
  ordersControllerGetForStatus
);
ordersRouter.post("/", authMiddleware, ordersControllerPost);
ordersRouter.put("/:id/:status", authMiddleware, ordersControllerPut);

export default ordersRouter;