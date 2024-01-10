import code from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import { getIdFromToken, isProperToken } from "../middleware/verifyToken.middleware.js";
import { insertLike, deleteLike } from "../repositories/like.repositories.js";

// TO-DO 에러 핸들링 병합 생각해보기
export const enableLike = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const user_id = getIdFromToken(req);
    if (!isProperToken(user_id, res, code)) return;
    await errorDBHandler(insertLike)(db, isbn, user_id);
    res.status(code.OK).json("좋아요 활성");
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) res.status(code.BAD_REQUEST).json("이미 좋아요를 하셨습니다.");
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};

export const disableLike = async (req, res) => {
  const isbn = req.params.isbn;
  const user_id = getIdFromToken(req);
  if (!isProperToken(user_id, res, code)) return;
  await errorDBHandler(deleteLike)(db, isbn, user_id);
  res.status(code.OK).json("좋아요 비활성");
};
