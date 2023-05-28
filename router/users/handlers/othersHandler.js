import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
} from "../../../controllers/index.js";
import { hashSync, compareSync } from "bcrypt";
import { validateUser } from "../../../helpers/index.js";
import { logger } from "../../../logs/winston.js";

export const usersControllerGet = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (id)
      if (!user) {
        res.status(404);
        res.json({ errorMessage: "Recourse solicited is not found" });
        return;
      } else {
        res.json(user);
        return;
      }
    res.json(await getAllUsers());
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const usersControllerPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, password } = req.body;
    const oldUser = await getUserById(id);
    if (!oldUser && id !== req.user.id) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is not found` });
      return;
    }
    const newUser = {
      name,
      phone,
      email: oldUser.email,
      password:
        password === oldUser.password || compareSync(password, oldUser.password)
          ? password
          : hashSync(password, 10),
    };
    const validate = validateUser(newUser);
    if (!validate.status) {
      const errorMessage = validate.errorMessage;
      res.status(403);
      res.json({ errorMessage });
      return;
    }
    res.json(await updateUser(newUser));
  } catch (error) {
    logger.error(`We has problems1: ${error.message}`);
  }
};

export const usersControllerDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin } = req.user;
    const user = await getUserById(id);
    if (!admin && id !== req.user.id) {
      res.status(403);
      res.json({
        errorMessage: `Recourse solicited is invalid. This route is for only admin`,
      });
      return;
    }
    if (user && (admin == true || id === req.user.id)) {
      res.json(await deleteUserById(id));
      return;
    }
    res.status(404);
    res.json({ errorMessage: `Recourse solicited is not found` });
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};