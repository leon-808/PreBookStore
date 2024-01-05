import code from "http-status-codes";
import bcrypt from "bcrypt";
import path from "path";
const __dirname = path.resolve();

import { insertUser } from "../models/signUp.model.js";
import { genHashedPassword } from "../middleware/password.js";

export const signUp_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/signUp.html"));
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const submitSignUp = async (req, res) => {
  try {
    const { id, password, name, birth, tel, email, address } = req.body;
    const hashedPassword = genHashedPassword(password);
    insertUser(id, hashedPassword, name, birth, tel, email, address);
    res.status(code.CREATED).end();
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};
