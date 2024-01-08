import code from "http-status-codes";
import path from "path";
const __dirname = path.resolve();

import { getIdFromToken, isProperToken } from "../middleware/verifyToken.js";
import { selectBooksinBasket, insertBookinBasket, updateBooksinBasket } from "../models/basket.model.js";

export const basket_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/basket.html"));
  } catch (err) {
    res.status(code.INTERNAL_SERVER_ERROR).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const getBasketList = async (req, res) => {
  try {
    let user_id;
    if (req.headers.authorization) {
      user_id = getIdFromToken(req.headers.authorization.split(" ")[1]);
    }
    isProperToken(user_id);
    const result = await selectBooksinBasket(user_id);
    res.status(code.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};

export const addBookinBasket = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    let user_id;
    if (req.headers.authorization) {
      user_id = getIdFromToken(req.headers.authorization.split(" ")[1]);
    }
    isProperToken(user_id);
    await insertBookinBasket(user_id, isbn);
    res.status(code.CREATED).json("장바구니에 도서 등록");
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};

export const updateBasketWhenUnload = async (req, res) => {
  try {
    const { isbn_list, quantity_list, selected_list } = req.body;
    console.log(isbn_list);
    if (!isbn_list || isbn_list.length === 0) {
      return res.status(code.OK).json("장바구니 업데이트 없음");
    }
    let user_id;
    if (req.headers.authorization) {
      user_id = getIdFromToken(req.headers.authorization.split(" ")[1]);
    }
    isProperToken(user_id);
    await updateBooksinBasket(user_id, isbn_list, quantity_list, selected_list);
    res.status(code.OK).json("장바구니 업데이트 완료");
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};

export const deleteBookinBasket = (req, res) => {
  try {
    res.status(code.OK).json("장바구니의 도서 삭제");
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};
