import code from "http-status-codes";
import path from "path";
const __dirname = path.resolve();

import { getIdFromToken, isProperToken } from "../middleware/verifyToken.js";
import { insertLike, deleteLike } from "../models/like.model.js";

export const enableLike = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const user_id = getIdFromToken(req.headers.authorization.split(" ")[1]);
    isProperToken(user_id);
    await insertLike(isbn, user_id);
    res.status(code.OK).json("좋아요 활성");
  } catch (err) {
    console.log(err);
    if (err.code === code.UNAUTHORIZED) res.status(err.code).json(err.message);
    if (err.errno === 1062) res.status(code.BAD_REQUEST).json("이미 좋아요를 하셨습니다.");
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};

export const disableLike = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    let user_id;
    if (req.headers.authorization) {
      user_id = getIdFromToken(req.headers.authorization.split(" ")[1]);
    }
    isProperToken(user_id);
    await deleteLike(isbn, user_id);
    res.status(200).json("좋아요 비활성");
  } catch (err) {
    console.log(err);
    if (err.code === code.UNAUTHORIZED) res.status(err.code).json(err.message);
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};
