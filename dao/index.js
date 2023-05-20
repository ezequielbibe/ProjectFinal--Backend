import { PERSISTENCE } from "../config/environment.js"
import { logger } from "../logs/winston.js"
import ContainerMongoDB from "./containerMongo.js"
import ContainerMemory from "./containerMemory.js"

import { Users } from '../schemas/index.js'
import { users } from "./containerMemory.js"

const dao = PERSISTENCE === "MONGO" ? ContainerMongoDB : ContainerMemory

export const daoUsers = new dao(PERSISTENCE === "MONGO" ? Users : users)

PERSISTENCE === 'MONGO' ? logger.info('API initializated with DAO on MongoDB') : logger.info('API initializated with DAO on Memory')