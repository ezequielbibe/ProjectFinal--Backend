import { daoUsers } from "../dao/index.js";
import { logger } from "../logs/winston.js";

export const createUser = async (data) => {
  try {
    const newData = { ...data, admin: false };
    return await daoUsers.createData(newData);
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

export const getUserById = async (id) => {
  try {
    return await daoUsers.readOneData("_id", id);
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

export const deleteUserById = async (id) => {
  try {
    return await daoUsers.deleteData("_id", id);
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const clearUsers = async () => {
  await daoUsers.clearData();
};