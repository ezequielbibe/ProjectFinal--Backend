import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  deleteProductById,
  updateProduct,
} from "../../controllers/index.js";
import { validateProduct } from "../../helpers/index.js";
import { logger } from "../../logs/winston.js";

export const productControllerGet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.user);
    const prod = await getProductById(id);
    if (id)
      if (!prod) {
        res.status(404);
        res.json({ errorMessage: "Recourse solicited is not found" });
        return;
      } else {
        res.json(prod);
        return;
      }
    res.json(await getAllProducts());
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const productControllerGetFor = async (req, res) => {
  try {
    const { category } = req.params;
    if (
      category === "phoneCases" ||
      category === "phones" ||
      category === "headphones" ||
      category === "others"
    ) {
      res.json(await getProductsByCategory(category));
      return;
    }
    res.status(404);
    res.json({ errorMessage: `Category solicited is invalid.` });
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const productControllerPost = async (req, res) => {
  try {
    const { admin } = req.user;
    const product = req.body;
    if (!admin) {
      res.status(403);
      res.json({
        errorMessage: `Recourse solicited is invalid. This route is for only admin`,
      });
      return;
    }
    const validate = validateProduct(product);
    if (!validate.status) {
      res.status(403);
      res.json({ errorMessage: validate.errorMessage });
      return;
    }
    const data = { timeStamp: new Date().toLocaleString(), ...product };
    res.json(await createProduct(data));
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const productControllerPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin } = req.user;
    const oldProduct = await getProductById(id);
    if (!admin) {
      res.status(403);
      res.json({ error: `route invalid. This route is for only admin` });
      return;
    }
    if (!oldProduct) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is not found` });
      return;
    }
    const product = req.body;
    const validate = validateProduct(product);
    if (!validate.status) {
      const errorMessage = validate.errorMessage;
      res.status(403);
      res.json({ errorMessage });
      return;
    }
    res.json(
      await updateProduct(id, {
        ...product,
        timeStamp: new Date().toLocaleString(),
      })
    );
  } catch (error) {
    res.status(400);
    logger.error(`error: ${error.message}`);
  }
};

export const productControllerDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin } = req.user;
    const prod = await getProductById(id);
    if (!admin) {
      res.status(403);
      res.json({ error: `route invalid. This route is for only admin` });
      return;
    }
    if (!prod) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is not found` });
      return;
    }
    res.json(await deleteProductById(id));
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};