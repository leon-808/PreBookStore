import httpCode from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";

export const order_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/order.html"));
};

export const getUserOrder = (req, res) => {
  res.status(httpCode.OK).json("유저의 주문 정보 가져오기");
};
