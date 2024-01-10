import code from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const env = dotenv.config().parsed;
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import { issueToken } from "../middleware/issueToken.middleware.js";
import { selectUserforLogin } from "../repositories/login.repositories.js";

export const logIn_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/logIn.html"));
};

export const proceedLogIn = async (req, res) => {
  const { id, password } = req.body;
  const { db_id, db_password } = await errorDBHandler(selectUserforLogin)(db, id);
  if (id !== db_id) throw { code: code.UNAUTHORIZED, message: "입력한 ID 는 존재하지 않습니다." };
  await bcrypt.compare(password, db_password);
  issueToken(id, res);
};
