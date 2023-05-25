import { Router } from "express";
import passport from "passport";
import {
  usersControllerGet,
  usersControllerPut,
  usersControllerDelete,
  loginController,
  registerController,
  errorController,
} from "./handlers/index.js";
import { authMiddleware } from "../../helpers/index.js";

const usersRouter = Router();
usersRouter.get("/:email?", usersControllerGet);
usersRouter.put("/:email", authMiddleware, usersControllerPut);
usersRouter.delete("/:email", authMiddleware, usersControllerDelete);
usersRouter.get(
  "/auth/login",
  passport.authenticate("login", {
    failureRedirect: "/users/auth/error",
    failureMessage: true,
    session: false,
  }),
  loginController
);
usersRouter.post(
  "/auth/register",
  passport.authenticate("register", {
    failureRedirect: "/users/auth/error",
    failureMessage: true,
  }),
  registerController
);
usersRouter.get("/auth/error", errorController);

export default usersRouter;