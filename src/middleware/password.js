import bcrypt from "bcrypt";
import code from "http-status-codes";

export const genHashedPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  return await bcrypt.hash(password, salt);
};
