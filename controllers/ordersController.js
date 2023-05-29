import { logger } from "../logs/winston.js";
import { daoOrder } from "../dao/index.js";

export const createOrder = async (data) => {
  try {
    return await daoOrder.createData(data);
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const getOneOrder = async (idOrder) => {
  try {
    return await daoOrder.readOneData("idOrder", idOrder);
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const getAllOrders = async () => {
  try {
    return await daoOrder.readAllData();
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const getOrdersForUserEmail = async (email) => {
  try {
    return await daoOrder.readDataFor("email", email);
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const getOrdersForStatus = async (status) => {
  try {
    return await daoOrder.readDataFor("status", status);
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const updateOrderStatus = async (idOrder, status) => {
  try {
    const order = await daoOrder.readOneData("idOrder", idOrder);
    return await daoOrder.updateData("idOrder", idOrder, { ...order, status });
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};