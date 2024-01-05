import bcrypt from "bcrypt";
import code from "http-status-codes";

export const genHashedPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (hashedPWfromDB, comparisonPW) => {
  const db_salt = hashedPWfromDB.slice(0, 29);
  const hashedComparison = await bcrypt.hash(comparisonPW, db_salt);
  if (hashedPWfromDB !== hashedComparison) {
    throw { code: code.UNAUTHORIZED, message: "올바른 비밀번호가 아닙니다. 비밀번호를 다시 입력해주세요." };
  }
  return true;
};
