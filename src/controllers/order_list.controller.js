import httpCode from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import { selectOrdered5 } from "../repositories/order_list.repositories.js";

export const order_list_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/order_list.html"));
};

export const getOrdered = async (req, res, user_id) => {
  const url_id = req.params.user_id;
  if (url_id !== user_id) throw { httpCode: httpCode.UNAUTHORIZED, message: "올바른 URL 로 접근해주세요" };
  const result = await errorDBHandler(selectOrdered5)(db, user_id);
  res.status(httpCode.OK).json(result);
};
