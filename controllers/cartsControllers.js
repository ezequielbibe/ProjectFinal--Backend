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
    const products = cart.products;
    if (products.some((key) => key._id.toString() === product._id.toString())) {
      const idx = products.findIndex(
        (element) => element._id.toString() === product._id.toString()
      );
      products[idx].amount += 1;
      return await daoCart.updateData("id", id, { ...cart, products });
    }
    cart["products"].push({ ...product, amount: 1 });
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

export const removeProductCart = async (cart, id) => {
  try {
    const products = cart.products;
    const idx = products.findIndex((element) => element._id.toString() === id);
    if (products[idx].amount !== 1) {
      products[idx].amount -= 1;
      return await daoCart.updateData("id", cart.id, { ...cart, products });
    } else {
      const newProducts = products.filter((prod) => prod._id.toString() !== id);
      return await daoCart.updateData("id", cart.id, {
        ...cart,
        products: newProducts,
      });
    }
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const clearAllCarts = async () => {
  await daoCart.clearData();
};