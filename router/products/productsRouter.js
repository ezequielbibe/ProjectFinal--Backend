import { Router } from "express";
import { authMiddleware } from "../../helpers/index.js";
import {
  productControllerGet,
  productControllerGetFor,
  productControllerPost,
  productControllerPut,
  productControllerDelete,
} from "./productsHandler.js";

const productsRouter = Router();

productsRouter.get("/:id?", authMiddleware, productControllerGet);
productsRouter.get(
  "/category/:category",
  authMiddleware,
  productControllerGetFor
);
productsRouter.post("/", authMiddleware, productControllerPost);
productsRouter.put("/:id", authMiddleware, productControllerPut);
productsRouter.delete("/:id", authMiddleware, productControllerDelete);

export default productsRouter;