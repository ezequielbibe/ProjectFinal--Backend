export const validateProduct = (user) => {
  const schema = ["prodName", "description", "code", "price", "photo", "stock"];
  const errors = [];
  schema.forEach((value) => !user.hasOwnProperty(value) && errors.push(value));
  if (errors.length !== 0) {
    return {
      status: false,
      errorMessage: `error in the schema: ${errors.join(", ")}`,
    };
  }
  Object.keys(user).forEach((key) => {
    if (!schema.some((type) => type === key)) {
      errors.push(key);
      return;
    }
    if (
      (key === "code" || key === "price" || key === "stock") &&
      typeof user[key] !== "number"
    ) {
      errors.push(key);
      return;
    }
    if (
      typeof user[key] !== "string" &&
      key !== "code" &&
      key !== "price" &&
      key !== "stock"
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