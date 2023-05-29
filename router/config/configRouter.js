import { Router } from "express";
import {
  PORT,
  MONGO_LOCAL,
  MONGO_ATLAS,
  SESSION_TIME,
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
    MONGO_LOCAL,
    MONGO_ATLAS,
    SESSION_TIME,
    nodeVersion,
    memoryUsage,
    execPath,
    pid,
    fileProyect,
  });
});

export default configRouter;