import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

export const getIdFromToken = (req) => {
  if (!req.headers.authorization) return null;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, env.SECRET_KEY);
  return decoded.id;
};

export const isProperToken = (id, res, code) => {
  if (!id) {
    res.status(code.UNAUTHORIZED).json("유효한 접근 방식이 아닙니다. 로그인을 해주세요.");
    return false;
  }
  return true;
};
