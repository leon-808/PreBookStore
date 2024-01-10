import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const env = dotenv.config().parsed;

export const issueToken = (id, res) => {
  const token = jwt.sign({ id: id }, env.SECRET_KEY, { expiresIn: "60m", issuer: "leehoseong" });
  return res.cookie("token", token, { httpOnly: true }).status(code.OK).json("로그인 성공");
};

export const issueTokenforTest = (id) => {
  return jwt.sign({ id: id }, env.SECRET_KEY, { expiresIn: "10m", issuer: "leehoseong" });
};
