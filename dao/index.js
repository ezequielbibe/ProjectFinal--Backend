import { PERSISTENCE } from "../config/environment.js"
import { logger } from "../logs/winston.js"
import ContainerMongoDB from "./containerMongo.js"
import ContainerMemory from "./containerMemory.js"


import { Carts, Products, Users} from '../schemas/index.js'
import { carts, products, users } from "./containerMemory.js"
import { logger } from "../logs/winston.js"

const dao = PERSISTENCE === "MONGO" ? ContainerMongoDB : ContainerMemory

export const daoUsers = new dao(PERSISTENCE === "MONGO" ? Users : users)

PERSISTENCE === 'MONGO' ? logger.info('API initializated with DAO on MongoDB') : logger.info('API initializated with DAO on Memory')