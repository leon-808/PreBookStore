import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

export const getIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY);
    return decoded.id;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const isProperToken = (id) => {
  if (!id) {
    throw { code: code.UNAUTHORIZED, message: "유효한 접근 방식이 아닙니다. 로그인을 해주세요." };
  }
};
