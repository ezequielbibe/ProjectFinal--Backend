import { ADMIN_EMAIL } from "../../config/environment.js";
import { logger } from "../../logs/winston.js";
import {
  createOrder,
  getAllOrders,
  getOneOrder,
  getOrdersForUserEmail,
  getOrdersForStatus,
  updateOrderStatus,
  getUserByEmail,
  clearCart,
} from "../../controllers/index.js";
import { validateOrder, handleSendMail } from "../../helpers/index.js";

export const ordersControllerGet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.json(await getAllOrders());
      return;
    }
    const order = await getOneOrder(id);
    if (!order) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is invalid` });
      return;
    }
    res.json(order);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const ordersControllerPost = async (req, res) => {
  try {
    const order = req.body;
    const validate = await validateOrder(order);
    if (!validate.status) {
      res.status(403);
      res.json({ errorMessage: validate.errorMessage });
      return;
    }
    const user = await getUserByEmail(order.email);
    const newOrder = await createOrder({
      ...order,
      timeStamp: new Date().toLocaleString(),
      idOrder: (await getAllOrders()).length + 1,
      status: "generated",
    });
    res.json(newOrder);
    await clearCart(user._id);
    const subject = `New order for: ${user.name} // ${user.email}`;
    const text = JSON.stringify(newOrder, null, 2);
    await handleSendMail(text, subject, ADMIN_EMAIL);
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const ordersControllerGetForStatus = async (req, res) => {
  try {
    const { status } = req.params;
    if (
      status !== "generated" &&
      status !== "finished" &&
      status !== "canceled"
    ) {
      res.status(404);
      res.json({ errorMessage: `Status invalid.` });
      return;
    }
    res.json(await getOrdersForStatus(status));
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const ordersControllerGetForEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is invalid` });
      return;
    }
    res.json(await getOrdersForUserEmail(email));
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};

export const ordersControllerPut = async (req, res) => {
  try {
    const { id, status } = req.params;
    const { admin } = req.user;
    const order = await getOneOrder(id);
    if (!admin) {
      res.status(403);
      res.json({ error: `route invalid. This route is for only admin` });
      return;
    }
    if (!order) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is not found` });
      return;
    }
    if (typeof status !== "string") {
      res.status(404);
      res.json({ errorMessage: `The status should be a string` });
    }
    if (status !== "canceled" && status !== "finished") {
      res.status(404);
      res.json({
        errorMessage: `The status should be a "canceled" or "finished"`,
      });
      return;
    }
    res.json(await updateOrderStatus(id, status));
  } catch (error) {
    logger.error(`error: ${error.message}`);
  }
};