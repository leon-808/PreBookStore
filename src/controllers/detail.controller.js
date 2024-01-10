import path from "path";
import code from "http-status-codes";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import { getIdFromToken } from "../middleware/verifyToken.middleware.js";
import { selectBookInfo } from "../repositories/detail.repositories.js";

export const detail_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/detail.html"));
};

export const getDetailofBook = async (req, res) => {
  const isbn = req.params.isbn;
  const user_id = getIdFromToken(req);
  const result = await errorDBHandler(selectBookInfo)(db, isbn, user_id);
  res.status(code.OK).json(result);
};
