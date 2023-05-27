import { Router } from "express";
import { authMiddleware } from "../../helpers/index.js";
import {
  productControllerGet,
  productControllerPost,
  productControllerPut,
  productControllerDelete,
} from "./productsHandler.js";

const productsRouter = Router();

productsRouter.get("/:id?", authMiddleware, productControllerGet);
productsRouter.post("/", authMiddleware, productControllerPost);
productsRouter.put("/:id", authMiddleware, productControllerPut);
productsRouter.delete("/:id", authMiddleware, productControllerDelete);

export default productsRouter;