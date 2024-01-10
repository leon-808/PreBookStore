import httpCode from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";

export const order_list_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/order_list.html"));
};

export const proceedToOrderList = (req, res) => {
  res.status(httpCode.CREATED).json("주문 확정 후 order_list 테이블에 추가");
};

export const getOrderList = (req, res) => {
  res.status(httpCode.OK).json("주문 조회 내역 가져오기");
};
