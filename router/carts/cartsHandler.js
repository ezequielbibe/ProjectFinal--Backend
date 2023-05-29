import { logger } from "../../logs/winston.js";
import {
  createCart,
  getCartById,
  getUserById,
  addProductCartById,
  getProductById,
  clearCart,
  removeProductCart,
} from "../../controllers/index.js";

export const newCartControllerGet = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await getCartById(id);
    const user = await getUserById(id);
    if (!user) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is not found` });
      return;
    }
    if (cart) {
      res.status(404);
      res.json({ errorMessage: `The id: ${id}, it have a cart` });
      return;
    }
    res.json(
      await createCart({
        id,
        timeStamp: new Date().toLocaleString(),
        products: [],
      })
    );
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const cartControllerGet = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await getCartById(id);
    if (!cart) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is not found` });
      return;
    }
    res.json(cart);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const cartControllerPostProduct = async (req, res) => {
  try {
    const { id, _id } = req.params;
    (await getUserById(_id)) &&
      !(await getCartById(_id)) &&
      (await createCart({
        id: _id,
        timeStamp: new Date().toLocaleString(),
        products: [],
      }));

    const cart = await getCartById(_id);
    const product = await getProductById(id);

    if (!cart) {
      res.status(404);
      res.json({ errorMessage: `Cart solicited is not found` });
      return;
    }
    if (!product) {
      res.status(404);
      res.json({ errorMessage: `Product solicited is not found` });
      return;
    }
    res.json(await addProductCartById(_id, product));
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const cartControllerDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await getCartById(id);
    if (!cart) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is not found` });
      return;
    }
    res.json(await clearCart(id));
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const cartControllerDeleteProduct = async (req, res) => {
  try {
    const { _id, id } = req.params;
    const cart = await getCartById(_id);
    const product = await getProductById(id);
    if (!cart) {
      res.status(404);
      res.json({ errorMessage: `Cart solicited is not found` });
      return;
    }
    if (!product) {
      res.status(404);
      res.json({ errorMessage: `Product solicited is not found` });
      return;
    }
    res.json(await removeProductCart(_id, id));
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};