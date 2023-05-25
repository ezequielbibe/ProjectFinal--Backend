import {
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUserByEmail,
} from "../../../controllers/index.js";
import { hashSync, compareSync } from "bcrypt";
import { validateUser } from "../../../helpers/index.js";
import { logger } from "../../../logs/winston.js";

export const usersControllerGet = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (email)
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
    const { email } = req.params;
    const { name, phone, address, age, avatar, password } = req.body;
    const oldUser = await getUserByEmail(email);
    if (!oldUser & (email === req.user.email)) {
      res.status(404);
      res.json({ errorMessage: `Recourse solicited is not found` });
      return;
    }
    const newUser = {
      name,
      phone,
      address,
      age,
      avatar,
      email,
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
    const { email } = req.params;
    const { admin } = req.user;
    const user = await getUserByEmail(email);
    if (!admin && email !== req.user.email) {
      res.status(403);
      res.json({
        errorMessage: `Recourse solicited is invalid. This route is for only admin`,
      });
      return;
    }
    if (user && (admin == true || email === req.user.email)) {
      res.json(await deleteUserByEmail(email));
      return;
    }
    res.status(404);
    res.json({ errorMessage: `Recourse solicited is not found` });
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};