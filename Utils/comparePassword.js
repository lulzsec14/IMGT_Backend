import bcrypt from "bcryptjs";

const comparePasswords = (text, password) => {
  return bcrypt.compareSync(text, password);
};

export { comparePasswords };
