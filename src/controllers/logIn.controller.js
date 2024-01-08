import code from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const env = dotenv.config().parsed;
import path from "path";
const __dirname = path.resolve();

import { isProperToken } from "../middleware/verifyToken.js";
import { selectUserforLogin } from "../models/login.model.js";

export const logIn_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/logIn.html"));
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const proceedLogIn = async (req, res) => {
  try {
    const { id, password } = req.body;
    const { db_id, db_password } = await selectUserforLogin(id);
    isProperToken(db_id);
    await bcrypt.compare(password, db_password);
    issueToken(id, res);
  } catch (err) {
    console.log(err);
    if (err.code === code.UNAUTHORIZED) res.status(code.UNAUTHORIZED).json(err.message);
    res.status(code.INTERNAL_SERVER_ERROR);
  }
};

const issueToken = (id, res) => {
  const token = jwt.sign({ id: id }, env.SECRET_KEY, { expiresIn: "60m", issuer: "leehoseong" });
  return res.cookie("token", token, { httpOnly: true }).status(code.OK).json("로그인 성공");
};
