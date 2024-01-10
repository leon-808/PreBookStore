import httpCode from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import { getIdFromToken, isProperToken, isIDMatch } from "../middleware/verifyToken.middleware.js";
import { selectBooksinBasket, insertBookinBasket, updateBooksinBasket } from "../repositories/basket.repositories.js";

export const basket_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/basket.html"));
};

export const getBasketList = async (req, res, user_id) => {
  const url_id = req.params.user_id;
  if (url_id !== user_id) throw { code: httpCode.UNAUTHORIZED, message: "권한이 없습니다. 로그인을 해주세요." };
  const result = await errorDBHandler(selectBooksinBasket)(db, user_id);
  res.status(httpCode.OK).json(result);
};

export const addBookinBasket = async (req, res, user_id) => {
  const isbn = req.params.isbn;
  await errorDBHandler(insertBookinBasket)(db, user_id, isbn);
  res.status(httpCode.CREATED).json(true);
};

export const updateBasketWhenUnload = async (req, res, user_id) => {
  const { isbn_list, quantity_list, selected_list } = req.body;
  if (!isbn_list || isbn_list.length === 0) {
    return res.status(httpCode.OK).json("장바구니 업데이트 없음");
  }
  await errorDBHandler(updateBooksinBasket)(db, user_id, isbn_list, quantity_list, selected_list);
  res.status(httpCode.OK).json("장바구니 업데이트 완료");
};

export const removeBookinBasket = async (req, res, user_id) => {
  const isbn_list = req.body.isbn_list;
  await errorDBHandler(deleteBooksinBasket)(db, user_id, isbn_list);
  res.status(httpCode.OK).json("장바구니의 도서 삭제");
};

export const requestOrderfromBasket = async (req, res, user_id) => {
  const { isbn_list, quantity_list } = req.body;
  await errorDBHandler(insertNewOrder)(isbn_list, quantity_list);
  res.status(httpCode.CREATED).json("장바구니 주문 요청");
};
