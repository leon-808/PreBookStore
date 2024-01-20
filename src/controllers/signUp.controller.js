import httpCode from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import { insertUser } from "../repositories/signUp.repositories.js";
import { genHashedPassword } from "../middleware/genHashedPassword.middleware.js";

export const signUp_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/signUp.html"));
};

export const submitSignUp = async (req, res) => {
  const { id, password, name, birth, tel, email, address } = req.body;
  const hashedPassword = genHashedPassword(password);
  await errorDBHandler(insertUser)(db, id, hashedPassword, name, birth, tel, email, address);
  res.status(httpCode.CREATED).end();
};
