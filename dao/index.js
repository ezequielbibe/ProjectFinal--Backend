import { PERSISTENCE } from "../config/environment.js";
import { logger } from "../logs/winston.js";
import ContainerMongoDB from "./containerMongo.js";
import ContainerMemory from "./containerMemory.js";

import { Users, Products } from "../schemas/index.js";
import { users, products } from "./containerMemory.js";

const dao = PERSISTENCE === "MONGO" ? ContainerMongoDB : ContainerMemory;

export const daoUsers = new dao(PERSISTENCE === "MONGO" ? Users : users);
export const daoProducts = new dao(
  PERSISTENCE === "MONGO" ? Products : products
);

PERSISTENCE === "MONGO"
  ? logger.info("API initializated with DAO on MongoDB")
  : logger.info("API initializated with DAO on Memory");