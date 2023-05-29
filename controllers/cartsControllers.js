import { daoCart } from "../dao/index.js";
import { logger } from "../logs/winston.js";

export const createCart = async (data) => {
  try {
    return await daoCart.createData(data);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const getCartById = async (id) => {
  try {
    return await daoCart.readOneData("id", id);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const addProductCartById = async (id, product) => {
  try {
    const cart = await daoCart.readOneData("id", id);
    cart["products"].push(product);
    return await daoCart.updateData("id", id, cart);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const clearCart = async (id) => {
  try {
    return await daoCart.deleteData("id", id);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const removeProductCart = async (_id, id) => {
  try {
    const cart = await daoCart.readOneData("id", _id);
    const newProducts = cart["products"].filter((prod) => {
      prod._id !== id;
    });
    return await daoCart.updateData("id", _id, {
      ...cart,
      products: newProducts,
    });
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const clearAllCarts = async () => {
  await daoCart.clearData();
};