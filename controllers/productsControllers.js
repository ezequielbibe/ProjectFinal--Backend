import { daoProducts } from "../dao/index.js";
import { logger } from "../logs/winston.js";

export const createProduct = async (data) => {
  try {
    return await daoProducts.createData(data);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const getProductById = async (id) => {
  try {
    return await daoProducts.readOneData("_id", id);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    return await daoProducts.readDataFor("category", category);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const getAllProducts = async () => {
  try {
    return await daoProducts.readAllData();
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const updateProduct = async (_id, product) => {
  try {
    return await daoProducts.updateData("_id", _id, product);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const deleteProductById = async (_id) => {
  try {
    return await daoProducts.deleteData("_id", _id);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const clearProducts = () => {
  return daoProducts.clearData();
};