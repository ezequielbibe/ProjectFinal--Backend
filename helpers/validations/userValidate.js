const phoneValidate = (number) => {
  const regexp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
  return regexp.test(number);
};

export const validateUser = (user) => {
  const errors = [];
  Object.keys(user).forEach((key) => {
    if (typeof user[key] !== "string") {
      errors.push(key);
      return;
    }
    if (key === "phone" && !phoneValidate(user[key])) {
      errors.push(key);
      return;
    }
  });
  if (errors.length === 0) {
    return { status: true };
  }
  const errorMessage = `Invalid properties, please check the user schema: ${errors.join(
    ", "
  )}`;
  return { status: false, errorMessage };
};