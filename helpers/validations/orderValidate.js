import { getUserByEmail } from "../../controllers/index.js";

export const validateOrder = async (order) => {
  const schema = ["email", "products"];
  const errors = [];
  schema.forEach((value) => !order.hasOwnProperty(value) && errors.push(value));
  if (errors.length !== 0) {
    return {
      status: false,
      errorMessage: `error in the schema: ${errors.join(", ")}`,
    };
  }
  const user = await getUserByEmail(order.email);

  Object.keys(order).forEach((key) => {
    if (key !== "email" && key !== "products") {
      errors.push(key);
      return;
    }
    if (key === "email" && (typeof order[key] !== "string" || !user)) {
      errors.push(key);
      return;
    }
    if (
      key === "products" &&
      (!Array.isArray(order.products) || order.products.length === 0)
    ) {
      errors.push(key);
      return;
    }
  });
  if (errors.length === 0) {
    return { status: true };
  }
  const errorMessage = `Invalid properties, please check the product schema: ${errors.join(
    ", "
  )}`;
  return { status: false, errorMessage };
};