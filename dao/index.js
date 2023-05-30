import { PERSISTENCE } from "../config/environment.js";
import { logger } from "../logs/winston.js";
import ContainerMongoDB from "./containerMongo.js";
import ContainerMemory, {
  orders,
  users,
  products,
  carts,
  chats,
} from "./containerMemory.js";
import { Users, Products, Carts, Orders, Chats } from "../schemas/index.js";

const dao = PERSISTENCE === "MONGO" ? ContainerMongoDB : ContainerMemory;

export const daoUsers = new dao(PERSISTENCE === "MONGO" ? Users : users);
export const daoProducts = new dao(
  PERSISTENCE === "MONGO" ? Products : products
);
export const daoCart = new dao(PERSISTENCE === "MONGO" ? Carts : carts);
export const daoOrder = new dao(PERSISTENCE === "MONGO" ? Orders : orders);
export const daoChat = new dao(PERSISTENCE === "MONGO" ? Chats : chats);

PERSISTENCE === "MONGO"
  ? logger.info("API initializated with DAO on MongoDB")
  : logger.info("API initializated with DAO on Memory");