import mongoose from "mongoose";
import { logger } from "../logs/winston.js";
import { MONGO_ATLAS, MONGO_LOCAL } from "../config/environment.js";

let isConnected;

const connectToMongoDB = async () => {
  if (!isConnected) {
    await mongoose.connect(`${MONGO_LOCAL}`);
    isConnected = true;
    logger.info(`Connection is ready`);
    return;
  }
  logger.warn(`Connetion existing`);
};

export default connectToMongoDB;