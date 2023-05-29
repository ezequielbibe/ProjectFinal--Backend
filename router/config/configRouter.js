import { Router } from "express";
import {
  PORT,
  PERSISTENCE,
  nodeVersion,
  memoryUsage,
  execPath,
  pid,
  fileProyect,
} from "../../config/environment.js";
const configRouter = Router();

configRouter.get("/", (_, res) => {
  res.render("config", {
    PORT,
    PERSISTENCE,
    nodeVersion,
    memoryUsage,
    execPath,
    pid,
    fileProyect,
  });
});

export default configRouter;