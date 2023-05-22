export {
  generateToken,
  verifyToken,
  authMiddleware,
} from "./jwt/jsonwebtoken.js";

export const phoneValidate = (number) => {
  const regexp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
  return regexp.test(number);
};

export const objectValidate = (obj) => {
  const error = [];
  Object.keys(obj).forEach((key) => {
    if (key === "phone") !phoneValidate(obj[key]) && error.push(key);
    else !obj[key] && error.push(key);
  });
  if (error.length === 0) {
    return { status: true };
  }
  const errorMessage = `Invalid properties: ${error.join(", ")}`;
  return { status: false, errorMessage };
};