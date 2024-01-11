import httpCode from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import { insertLike, deleteLike } from "../repositories/like.repositories.js";

export const enableLike = async (req, res, user_id) => {
  const isbn = req.params.isbn;
  await errorDBHandler(insertLike)(db, isbn, user_id);
  res.status(httpCode.OK).json("좋아요 활성");
};

export const disableLike = async (req, res, user_id) => {
  const isbn = req.params.isbn;
  await errorDBHandler(deleteLike)(db, isbn, user_id);
  res.status(httpCode.OK).json("좋아요 비활성");
};
