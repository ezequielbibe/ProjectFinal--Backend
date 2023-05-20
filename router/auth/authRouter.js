import { Router } from "express";
import passport from "passport";
import {
  loginController,
  registerController,
  errorController,
} from "./routerHandler.js";

const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/auth/error",
    failureMessage: true,
  }),
  loginController
);
authRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/auth/error",
    failureMessage: true,
  }),
  registerController
);
authRouter.get("/error", errorController);

export default authRouter;