import code from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errDB } from "../middleware/repositoryErrorHandler.middleware.js";

export const order_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/order.html"));
};

export const proceedToOrder = (req, res) => {
  res.status(code.OK).json("장바구니의 도서 주문해서 order 테이블에 추가");
};

export const getUserOrder = (req, res) => {
  res.status(code.OK).json("유저의 주문 정보 가져오기");
};
