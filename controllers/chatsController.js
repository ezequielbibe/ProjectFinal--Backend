import { daoChat } from "../dao/index.js";
import { logger } from "../logs/winston.js";

export const createChat = async (data) => {
  try {
    return await daoChat.createData(data);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const updateChat = async (email, chat) => {
  try {
    return await daoChat.updateData("email", email, chat);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const getAllChats = async () => {
  try {
    return await daoChat.readAllData();
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const getChatForEmail = async (email) => {
  try {
    return await daoChat.readOneData("email", email);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const getOneChat = async (id) => {
  try {
    return await daoChat.readOneData("id", id);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};