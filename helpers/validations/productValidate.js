export const validateProduct = (prod) => {
  const schema = [
    "prodName",
    "description",
    "category",
    "price",
    "photo",
    "stock",
  ];
  const errors = [];
  schema.forEach((value) => !prod.hasOwnProperty(value) && errors.push(value));
  if (errors.length !== 0) {
    return {
      status: false,
      errorMessage: `error in the schema: ${errors.join(", ")}`,
    };
  }
  Object.keys(prod).forEach((key) => {
    if (!schema.some((type) => type === key)) {
      errors.push(key);
      return;
    }
    if (
      (key === "code" || key === "price" || key === "stock") &&
      typeof prod[key] !== "number"
    ) {
      errors.push(key);
      return;
    }
    if (
      key === "category" &&
      prod[key] !== "phoneCases" &&
      prod[key] !== "phones" &&
      prod[key] !== "headphones" &&
      prod[key] !== "others"
    ) {
      errors.push(key);
      return;
    }
    if (
      typeof prod[key] !== "string" &&
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