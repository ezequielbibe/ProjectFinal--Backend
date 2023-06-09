import { logger } from "../../../logs/winston.js";
import { createUser } from "../../../controllers/index.js";
import { generateToken } from "../../../helpers/jwt/jsonwebtoken.js";
import { handleSendMail, validateUser } from "../../../helpers/index.js";
import { ADMIN_EMAIL } from "../../../config/environment.js";

export const loginController = async (req, res) => {
  try {
    const { name, _id, admin } = req.user;
    const token = generateToken({ name, _id, admin });
    res.json({ token });
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const { email, password, admin } = req.session.passport.user;
    const user = { name, phone, email, password };
    const validate = validateUser(user);
    if (!validate.status) {
      const errorMessage = validate.errorMessage;
      res.status(403);
      res.json({ errorMessage });
      return;
    }
    const data = await createUser({ ...user, admin });
    res.json(data);
    const subject = "New user register!";
    const text = JSON.stringify(data, null, 2);
    await handleSendMail(text, subject, ADMIN_EMAIL);
  } catch (error) {
    logger.error(`We has problems: ${error.message}`);
  }
};

export const errorController = (req, res) => {
  const errorMessage = req.session.messages[0];
  req.session.destroy();
  res.status(403);
  res.json({ errorMessage });
};