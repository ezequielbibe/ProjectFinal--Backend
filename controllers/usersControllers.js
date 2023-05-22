import { daoUsers } from "../dao/index.js";
import { logger } from "../logs/winston.js";

export const createUser = async (data) => {
  try {
    const newData = { ...data, admin: false };
    await daoUsers.createData(newData);
    return newData;
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const getAllUsers = async () => {
  try {
    return await daoUsers.readAllData();
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await daoUsers.readOneData("email", email);
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const updateUser = async (user) => {
  try {
    return await daoUsers.updateData("email", user.email, user);
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const deleteUserByEmail = async (email) => {
  try {
    return await daoUsers.deleteData("email", email);
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const clearUsers = async () => {
  await daoUsers.clearData();
};