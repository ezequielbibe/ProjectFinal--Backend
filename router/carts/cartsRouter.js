import { Router } from "express";
import { authMiddleware } from "../../helpers/index.js";
import {
  cartControllerDelete,
  cartControllerDeleteProduct,
  cartControllerGet,
  cartControllerPostProduct,
  newCartControllerGet,
} from "./cartsHandler.js";

const cartRouter = Router();

cartRouter.get("/new/:id", authMiddleware, newCartControllerGet);
cartRouter.get("/:id", authMiddleware, cartControllerGet);
cartRouter.post("/:_id/:id", authMiddleware, cartControllerPostProduct);
cartRouter.delete("/:id", authMiddleware, cartControllerDelete);
cartRouter.delete("/:_id/:id", authMiddleware, cartControllerDeleteProduct);

export default cartRouter;